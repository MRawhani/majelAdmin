import React, { Component } from "react";
import Snackbar from "components/Snackbar/Snackbar";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import LoginForm from "../../Login/LoginForm";


import styles from "assets/jss/material-dashboard-react/layouts/loginStyle.js";
import { makeStyles } from '@material-ui/core';
import RTL from "../../../layouts/RTL";
import { connect } from "react-redux";
import { setGlobalProps } from "../../../actions";
import { EVENTS } from "../../../services/helpers";

  const useStyles = makeStyles(styles);

  const theme = createMuiTheme({
    direction: "rtl",
  });


function MajelLogin(props) {
  React.useEffect(() => {
    props.setGlobalProps({layout:EVENTS})
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      // var id = window.setTimeout(null, 0);
      // while (id--) {
      //   window.clearTimeout(id);
      // }
    };
  });
  const classes = useStyles();

  const [tc, setTC] = React.useState(true);

  return (
    <RTL path="/events">
    <MuiThemeProvider theme={theme}>
    <div>
      {props.location.state && props.location.state.login ? (
        <div>
          <div className={classes.container}>
            <LoginForm title={"مربع دخول  الشركة"} loginType="loginEventsCompany" />
            {/* <Snackbar
                  place="tl"
                  color="info"
                  
                  message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                  open={tc}
                  closeNotification={() => setTC(false)}
                  close
                /> */}
          </div>
        </div>
      ) : (
        <Redirect to="/home" />
      )}
    </div>
    </MuiThemeProvider></RTL>
  
  );
}


export default connect(
  null,
  { setGlobalProps }
)(MajelLogin);
