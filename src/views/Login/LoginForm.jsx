import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import LoginElement from "./LoginElement";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
      fontFamily: '"Noto Kufi Arabic" sans-serif', 

    marginBottom: "3px",
    textDecoration: "none"
  },

   
    form:{
    justifyContent:'center',
    position:'relative',
    top:'50%',
    transform:'translateY(-50%)'
      },
     
};

const useStyles = makeStyles(styles);

export default function LoginForm(props) {
  const classes = useStyles();
  return (
    <div style={{
      height:'100vh'
    }}>
      <GridContainer className={classes.form}>
        <GridItem xs={12} sm={12} md={6} >
          <LoginElement {...props} classes={classes}/>
           </GridItem>
      </GridContainer>
    </div>
  );
}
