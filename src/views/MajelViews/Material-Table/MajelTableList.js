import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components

import moment from "moment";
import MajelMaterialTable from "./MajelMaterialTable";
import TableWrapper from "../../../components/TableWrapper/TableWrapper";
import "moment/locale/en-ca";

export default function MajelTableList() {
  moment.locale("en-ca");
  // const classes = useStyles();
  const [startDate, handleStartDateChange] = React.useState(moment());
  const [endDate, handleEndDateChange] = React.useState(moment());
  console.log(startDate);
  console.log(endDate.locale("en-ca").format("YYYY/MM/DD"));
  return (
    <TableWrapper
      startDate={startDate}
      endDate={endDate}
      handleEndDateChange={handleEndDateChange}
      handleStartDateChange={handleStartDateChange}
    >
      <MajelMaterialTable
        date={{
          createdAtStart: startDate.locale("en-ca").format("YYYY/MM/DD"),
          createdAtEnd: endDate.locale("en-ca").format("YYYY/MM/DD"),
        }}
      />
    </TableWrapper>
    // <GridContainer>
    //   <GridItem xs={12} sm={12} md={12}>
    //     <CustomDatePicker
    //       title="تاريخ البداية"
    //       selectedDate={startDate}
    //       handleDateChange={handleStartDateChange}
    //     />
    //     <CustomDatePicker
    //       title="تاريخ النهاية"
    //       selectedDate={endDate}
    //       handleDateChange={handleEndDateChange}
    //     />
    //   </GridItem>
    //   <GridItem xs={12} sm={12} md={12}>
    //     <Card>
    //       <CardHeader color="primary">
    //         <h4 className={classes.cardTitleWhite}>Simple Table</h4>
    //         <p className={classes.cardCategoryWhite}>
    //           Here is a subtitle for this table
    //         </p>
    //       </CardHeader>
    //       <CardBody>
    //         <MajelMaterialTable
    //           date={{
    //             startAt: startDate.locale('en-ca').format("YYYY/MM/DD"),
    //             endAt: endDate.locale('en-ca').format("YYYY/MM/DD"),
    //           }}
    //         />
    //       </CardBody>
    //     </Card>
    //   </GridItem>
    // </GridContainer>
  );
}
