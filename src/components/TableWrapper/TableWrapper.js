import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import moment from "moment";
import CustomDatePicker from "../DatePicker/CustomDatePicker";
import "moment/locale/en-ca"; 


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
      fontFamily: '"Noto Kufi Arabic" sans-serif', 

    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function TableWrapper({handleEndDateChange,handleStartDateChange,startDate,
endDate,children}) {
    moment.locale("en-ca");
  const classes = useStyles();
 
  console.log(startDate);
  console.log(endDate.locale('en-ca').format("YYYY/MM/DD"));
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} className="flex">
       <div className="flex">
       <CustomDatePicker
          title="تاريخ البداية"
          selectedDate={startDate}
          handleDateChange={handleStartDateChange}
        />
        <CustomDatePicker
          title="تاريخ النهاية"
          selectedDate={endDate}
          handleDateChange={handleEndDateChange}
        />
       </div>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>قائمة الحجوزات</h4>
            <p className={classes.cardCategoryWhite}>
              قائمة حجوزات الشركة
            </p>
          </CardHeader>
          <CardBody>
            {children}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
