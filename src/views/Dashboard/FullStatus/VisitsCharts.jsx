import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import ChartistGraph from "react-chartist";
import AccessTime from "@material-ui/icons/AccessTime";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { getVisitsByWeek } from "../../../actions";

import {
  generateData,
  getValue,
  getIncreaseOrDecrease,
  barOptions
} from "variables/charts.js";

const useStyles = makeStyles(styles);

export default (props)=> {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    getVisitsByWeek(props.type)
      .then((res) => {
        console.log(res);
        setData(res);
        setError(false);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
    return function cleanup() {};
  }, [props.type]);
  return (
    <GridItem xs={12} sm={12} md={4}>
      <Card chart>
        <CardHeader color="danger">
          {loading ? (
            "loading"
          ) : error ? (
            "خطأ "
          ) : (
            <ChartistGraph
            className="ct-chart"
            data={generateData(data).data}

            type="Line"
            options={generateData(data).options}
            listener={generateData(data).animation}
            // responsiveOptions={emailsSubscriptionChart.responsiveOptions}
          />
          
          )}
        </CardHeader>
        <CardBody>
          {loading ? (
            "loading"
          ) : error ? (
            "خطأ "
          ) : (
            <>
              <h4 className={classes.cardTitle}>{getValue(data)}</h4>
              <p className={classes.cardCategory}>زيارات هذا الأسبوع</p>
            </>
          )}
        </CardBody>

        <CardFooter chart>
          {loading ? (
            "loading"
          ) : error ? (
            "خطأ "
          ) : (
            <div className={classes.stats}>
              {getIncreaseOrDecrease(data) < 0 ? (
                <span className={classes.errorText}>
                  <ArrowDownward className={classes.upArrowCardCategory} />{" "}
                  {getIncreaseOrDecrease(data)}%
                </span>
              ) : (
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} />{" "}
                  {getIncreaseOrDecrease(data)}%
                </span>
              )}{" "}
            </div>
          )}
        </CardFooter>
      </Card>
    </GridItem>
  );
}
