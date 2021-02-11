import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import Danger from "components/Typography/Danger.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import Icon from "@material-ui/core/Icon";

import Accessibility from "@material-ui/icons/Accessibility";

import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Warning from "components/Typography/Warning";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Link } from "react-router-dom";
import { getFullStats } from "../../../actions";

const useStyles = makeStyles(styles);

export default function FullStates(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    setLoading(true);
    getFullStats(props.type)
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
  console.log(data);
  return loading ? (
    "Loading"
  ) : error ? (
    <SnackbarContent message={"خطأ! حاول مرة اخرى "} close color="danger" />
  ) : (
    <GridContainer>
      <GridItem xs={12} sm={6} md={3}>
        <Card>
          <CardHeader color="warning" stats icon>
            <CardIcon color="warning">
              <Icon>content_copy</Icon>
            </CardIcon>
            <p className={classes.cardCategory}>الدائن لك</p>
            <h3 className={classes.cardTitle}>
              {data.profit} <small>ريال</small>
            </h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <Danger>
                <Warning />
              </Danger>
              <Link to={`/${props.type.toLowerCase()}/finance`}>
                عرض التفاصيل
              </Link>
            </div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={3}>
        <Card>
          <CardHeader color="success" stats icon>
            <CardIcon color="success">
              <Store />
            </CardIcon>
            <p className={classes.cardCategory}>مرات الحجز</p>
            <h3 className={classes.cardTitle}>{data.bookedTimes}</h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <DateRange />
              {Math.floor((data.bookedTimes / data.visits) * 100)}% نسبة الحجوزات الى الزيارات

            </div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={3}>
        <Card>
          <CardHeader color="danger" stats icon>
            <CardIcon color="danger">
              <Icon>info_outline</Icon>
            </CardIcon>
            <p className={classes.cardCategory}>الزيارات</p>
            <h3 className={classes.cardTitle}>{data.visits}</h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <LocalOffer />
              مخزونة حسب الip
            </div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={3}>
        <Card>
          <CardHeader color="info" stats icon>
            <CardIcon color="info">
              <Accessibility />
            </CardIcon>
            <p className={classes.cardCategory}>الزبائن</p>
            <h3 className={classes.cardTitle}>{data.customers}</h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <Update />
              {Math.floor((data.customers / data.visitors) * 100)}% نسبة الزبائن الى الزوار
            </div>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
