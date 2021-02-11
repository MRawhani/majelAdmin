import React from "react";
import { connect } from "react-redux";
import Dashboard from "../Dashboard/Dashboard";


function MajelDashboard({auth}) {
  
  return (
     auth.isAuth?
   <Dashboard />
 :null
 );
}

 
const mapStateToProps = (state) => ({
    auth:state.auth
});

const mapDispatchToProps = {
 
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MajelDashboard);
