import React, { Component } from 'react'

import LoginForm from '../views/Login/LoginForm'

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import styles from "./../assets/jss/material-dashboard-react/layouts/loginStyle.js";
import { makeStyles } from '@material-ui/core';
import RTL from './RTL';

  const useStyles = makeStyles(styles);

  const theme = createMuiTheme({
    direction: "rtl",
  });
export default function Login (props){
    const classes = useStyles();
   
    const [tc, setTC] = React.useState(true);
 
        return (
            <RTL>
            <MuiThemeProvider theme={theme}>
            <div>
                {props.location.state.LoginNeeded? ( <div>
                   
            <div className={classes.container}>
            <LoginForm />
           
            </div>
            </div>
                ):'Login'}
            </div>
    
                </MuiThemeProvider></RTL>
              )
    
}
