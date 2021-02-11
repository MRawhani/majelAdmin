import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import RTL from "./RTL";
import authService from "../services/auth-service";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "../components/Navbars/Navbar.js";
import Footer from "../components/Footer/Footer.js";
import Sidebar from "../components/Sidebar/Sidebar.js";

import routes from "../routes.js";

import styles from "../assets/jss/material-dashboard-react/layouts/rtlStyle.js";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import bgImage from "./../assets/img/sidebar-2.jpg";
import logo from "./../assets/img/reactlogo.png";
import { connect } from "react-redux";

let ps;
const theme = createMuiTheme({
  direction: "rtl",
});
const switchRoutes = (
  <Switch>
    {routes.majelRoute.map((prop, key) => {
        
      if (prop.layout === "/majel") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
         {/* <Redirect from="/redirect" to="/majel/dashboard" /> */}

          <Redirect from="/majel" to="/majel/dashboard" />
          <Redirect from="/" to="/majel" />

  </Switch>
);

const useStyles = makeStyles(styles);

function Majel({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  
  return (
    <RTL>
      <MuiThemeProvider theme={theme}>
        {true ?    <div className={classes.wrapper}>
          <Sidebar
            routes={routes.majelRoute.filter((route=>!route.sub))}
            logoText={"ماجل"}
            logo={logo}
            image={image}
            handleDrawerToggle={handleDrawerToggle}
            open={mobileOpen}
            color={color}
            // rtlActive
            {...rest}
          />
          <div className={classes.mainPanel} ref={mainPanel}>
            <Navbar
              routes={routes.majelRoute.filter((route=>!route.sub))}
              logoText={"عربون"}
              logo={logo}
              image={image}
              handleDrawerToggle={handleDrawerToggle}
              open={mobileOpen}
              color={color}
              // rtlActive
              {...rest}
         
              rtlActive
              {...rest}
            />
            {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
       
              <div className={classes.content}>
                <div className={classes.container}>{switchRoutes}</div>
              </div>
          
            {getRoute() ? <Footer /> : null}
            {/* <FixedPlugin
              handleImageClick={handleImageClick}
              handleColorClick={handleColorClick}
              bgColor={color}
              bgImage={image}

              handleFixedClick={handleFixedClick}
              fixedClasses={fixedClasses}
              rtlActive
            /> */}
          </div>
        </div>
   : <p>تحتاج لتسجيل دخولك </p>}
        </MuiThemeProvider>
    </RTL>
  );
}


const mapStateToProps = (state) => ({
  globalProps:state.globalProps
});

const mapDispatchToProps = {
 
};

export default connect(mapStateToProps, mapDispatchToProps)(Majel);
