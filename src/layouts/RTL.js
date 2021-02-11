import React from "react";
import { create } from 'jss';
import rtl from 'jss-rtl';
//import JssProvider from 'react-jss/src/JssProvider';
import { createGenerateClassName, StylesProvider,jssPreset } from '@material-ui/core/styles';
import moment from "moment";
import { checkAuth } from "../actions";
import "moment/locale/en-ca"; 
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

moment.locale("en-ca");
// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

function RTL(props) {
   
  React.useEffect(() => {
    // Update the document title using the browser API
    
      props.checkAuth()
    
  });
  return (
    <StylesProvider jss={jss} generateClassName={generateClassName}>
     

      {props.children}
    </StylesProvider>
  );
}

export default connect(
  null,
  { checkAuth }
)(RTL);
