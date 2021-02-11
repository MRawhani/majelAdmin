import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MicIcon from "@material-ui/icons/Mic";
import HotelIcon from "@material-ui/icons/Hotel";
import RowingIcon from '@material-ui/icons/Rowing';
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import RTL from "./RTL";
import { Link } from "react-router-dom";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";

const theme = createMuiTheme({
  direction: "rtl",
});
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "100%",
    margin: "0 auto",
    height: "100vh",
    overflow: "hidden",
    background: `linear-gradient(60deg, #26c6da, #00acc1) `,
  },
  demo: {
   // backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  square: {
    margin: "0 auto",
  },
  gridContainer: {
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
  },
  box: {
    backgroundColor: theme.palette.background.paper,
    padding: "1rem",
    boxShadow: "0 1rem 2rem rgba(0, 0, 0, .2)",
    borderRadius: "50px",
    margin: "1rem 1rem",
    textAlign: "center",
  },
  avatar: {
    margin: ".5rem auto",
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

export default function InteractiveList() {
  const classes = useStyles();

  return (
    <RTL>
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.square}>
          
              <div className={classes.demo}>
                <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Link
                      to={{ pathname: "/login", state: { login: true } }}
                    >
                      <div className={classes.box}>
                      
                        <h3 style={{ margin: ".5rem",color:'#000' }}>دخول الى شاشة تسجيل الدخول</h3>
                      </div>
                    </Link>
                  </GridItem>
               
                      </GridContainer>
          
               </div>
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    </RTL>
  );
}
