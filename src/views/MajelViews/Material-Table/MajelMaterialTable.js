import React, { Component } from "react";
import { connect } from "react-redux";
import MaterialTable,{MTableToolbar} from "material-table";
import { withRouter, Link } from "react-router-dom";
import { getBookings, editBooking } from "actions";
import moment from "moment";
import { Check, Clear } from "@material-ui/icons";
import { Chip } from "@material-ui/core";


class MajelMaterialTable extends React.Component {
  constructor(props) {
    super(props);

    this.tableRef = React.createRef();
    this.state ={
      columns:[
        {
          title: "الرقم",
          field: "no"
        },
        {
          title: "المستخدم",
          field: "customer.name",

        
        },
        {
          title: "تاريخ الطلب",
          field: "createdAt",
          render: (rowData) => moment(rowData.createdAt).format("YYYY/MM/DD"),
        },
      
        { title: "الكمية", field: "quantity" ,customFilterAndSearch: (term, rowData) => term <= rowData.quantity},
        {
          title: " المنتج",
          field: "product.name",
          render: (rowData) =>
            this.renderColumn({
              to: {
                pathname: "/majel/products",
                state: { searchValue: `${rowData.product.name}` },
              },
              value: rowData.product.name,
            }),
        },
      
        {
          title: "السعر",
          field: "totalPrice",
          render: (rowData) => rowData.totalPrice ,
        },
          {
          title: "العبوة",
          field: "isFull",
       

          render: (rowData) => rowData.isQuarter?'ربع' :rowData.isHalf?'نص':'كامل',
        },
        {
          title: "تم الدفع",
          field: "paid",
          
          lookup: { true: <Check />, false: <Clear /> },
        },
        {
          title: "تم الاستلام",
          field: "delivered",
          lookup: { true: <Check />, false: <Clear /> },
        },
      
      ],
      financeColumns:[
        {
          title: "الرقم",
          field: "no"
        },
        {
          title: "المستخدم",
          field: "customer.name",

          render: (rowData) =>
            this.renderColumn({
              to: "/majel",
              value: rowData.customer.name,
            }),
        },
      
        {
          title: "تاريخ الحجز",
          field: "createdAt",
          render: (rowData) => moment(rowData.createdAt).format("YYYY/MM/DD"),
        },
        {
          title: " المنتج",
          field: "product.name",
          render: (rowData) =>
            this.renderColumn({
              to: {
                pathname: "/majel/products",
                state: { searchValue: `${rowData.product.name}` },
              },
              value: rowData.product.name,
            }),
        },
        { title: "دفع", field: "paid" },
     
      ],
      totalPrice:0
    }
    
  }
  componentDidMount() {
     
    // if (this.props.date) {
    //   this.setState({
    //     date:this.props.date
    //   });
    // }
  }
  componentWillReceiveProps(prevProps) {
    if (
     (  prevProps.date.createdAtStart !== this.props.date.createdAtStart ||
        prevProps.date.createdAtEnd !== this.props.date.createdAtEnd)
    ) {
      this.tableRef.current && this.tableRef.current.onQueryChange()
    }
  }
  renderColumn = (rowData) => (
    <Link className="link" to={rowData.to}>
      {rowData.value}
    </Link>
  );
  render() {
    return (
      <MaterialTable
        title="Refresh Data Preview"
        tableRef={this.tableRef}
        columns={this.props.finance? this.state.financeColumns:this.state.columns}
        data={(query) =>
          new Promise((resolve, reject) => {
             console.log(query)
            this.props
              .getBookings(
                query.page,
                query.pageSize,
                query.orderBy,
                query.orderDirection,
                query.filters,
                this.props.date,
                'bookEvent'
              )
              .then((res) => {
                console.log(res);
              this.setState({totalPrice:res.totalPrice})
                resolve(res);
              })
              .catch((err) => {
                 
                alert(err[0].message);
              });
          })
        }
        components={{
         
          Toolbar: props => (
           this.props.finance ?  <div>
           {  console.log(props)}
             
            <MTableToolbar {...props} />
            <div style={{padding: '0px 10px',display: 'flex',alignItems:'center'}}>
              <h5 style={{margin: '0'}}>المجموع</h5>
              <Chip label={this.state.totalPrice} color="secondary" style={{marginRight: 12}}/>
             
            </div>
          </div>:null
          ),
        }}
        editable={{
          disabled: true,
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              // resolve();
              // this.tableRef.current &&
              // this.tableRef.current.onQueryChange()
               
              console.log(oldData);
              console.log(Boolean(newData.fullyPaid));
              this.props
                .editBooking(newData, oldData._id,'bookEvent')
                .then((res) => {
                   
                  resolve(res);
                  console.log(this.tableRef.current);
                })
                .catch((err) => reject());
              // this.tableRef.current &&
              //       this.tableRef.current.onQueryChange();
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              oldData.cancelled = true;
              this.props
                .editBooking(oldData, oldData._id,'bookEvent')
                .then((res) => resolve())
                .catch((err) => alert("eee"));
            }),
        }}
        actions={[
        
        ]}
        detailPanel={[
          {
            tooltip: "Show Name",
            render: (rowData) => {
              return (
                <div
                  style={{
                    fontSize: 10,
                    textAlign: "right",
                    color: "white",
                    backgroundColor: "#ccc",
                  }}
                >
                  {rowData.addressDesc}
                </div>
              );
            },
          },
          {
            icon: "account_circle",
            tooltip: "Show Surname",
            render: (rowData) => {
              return (
                <div
                  style={{
                    fontSize: 100,
                    textAlign: "center",
                    color: "white",
                    backgroundColor: "#E53935",
                  }}
                >
                  {rowData.surname}
                </div>
              );
            },
          },
        ]}
      
        options={{
          filtering: true,
          rowStyle: (rowData) =>
                    
                    rowData.cancelled ? { backgroundColor: "#eee" } : rowData.delivered &&rowData.paid? {backgroundColor: "#04e60d47"} :rowData.delivered ? {backgroundColor: "#ead40566"}: null,

            exportButton: true,
            exportCsv: (columns, data) => {
              window.print()
            }
        }}
        
      />
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  getBookings,
  editBooking,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MajelMaterialTable));
