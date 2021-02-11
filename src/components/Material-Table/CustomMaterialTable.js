import React, { Component } from "react";
import { connect } from "react-redux";
import Material_Table from "material-table";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { getBookings } from "../../actions";
import { Button, Link } from "@material-ui/core";

class MaterialTable extends React.Component {
  constructor(props) {
    super(props);

    this.tableRef = React.createRef();
    this.state = {
      date: {
        startAt: "2020/06/8",
        endAt: "2020/06/9",
      },
    };
  }

  render() {
    return (
      <Material_Table
        title="Refresh Data Preview"
        tableRef={this.tableRef}
        columns={[
        
          { title: "المستخدم", field: "customer.name" },
          { title: "تاريخ البداية", field: "startAt" ,
          render: (rowData) => moment(rowData.startAt).format("YYYY/MM/DD")
        },
          { title: "تاريخ النهاية", field: "endAt",
          render: (rowData) => moment(rowData.endAt).format("YYYY/MM/DD")
        },
          { title: "الكمية", field: "quantity" },
          { title: " المنتج", field: "product.name" },
          { title: "تاريخ النهاية", field: "endAt" },
          { title: "المستخدم", field: "customer.name" },
          { title: "تاريخ البداية", field: "startAt" },
          { title: "تاريخ النهاية", field: "endAt" },
          { title: "المستخدم", field: "customer.name" },
          { title: "تاريخ البداية", field: "startAt" },
          { title: "تاريخ النهاية", field: "endAt" },
        ]}
        data={(query) =>
          new Promise((resolve, reject) => {
         
            this.props.getBookings(query.page, query.pageSize,this.state.date)
            .then((res) => {
              resolve(res);
            }).catch(err=>alert('err'))
          })
        }
        actions={[
          {
            icon: "refresh",
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: () =>
              this.tableRef.current && this.tableRef.current.onQueryChange(),
          },
          {
            icon: "save",
            tooltip: "Refresh Data",
            isFreeAction: false,
            onClick: () =>
            this.props.history.push('/')
          },
        ]}
        components={{
          
          Action: props => (
            <>
               {props.action.icon ==="save" &&<Link
            onClick={(event) => props.action.onClick(event, props.data)}
           
          >
            {console.log(props)
            }
            {props.data.paid}
          </Link>}
             {props.action.icon ==="refrsesh" &&<Button
             onClick={(event) => props.action.onClick(event, props.data)}
             color="primary"
             variant="contained"
             style={{textTransform: 'none'}}
             size="small"
           >
             {console.log(props)
             }
             {props.data._id}
           </Button>}
           
            </>
          ),
        }}
        detailPanel={[
          {
            tooltip: 'Show Name',
            render: rowData => {
              return (
                <div
                  style={{
                    fontSize: 10,
                    textAlign: 'right',
                    color: 'white',
                    backgroundColor: '#43A047',
                  }}
                >
                  {rowData.startAt}
                </div>
              )
            },
          },
          {
            icon: 'account_circle',
            tooltip: 'Show Surname',
            render: rowData => {
              return (
                <div
                  style={{
                    fontSize: 100,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#E53935',
                  }}
                >
                  {rowData.surname}
                </div>
              )
            },
          },
         
        ]}
      />
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  getBookings,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MaterialTable));
