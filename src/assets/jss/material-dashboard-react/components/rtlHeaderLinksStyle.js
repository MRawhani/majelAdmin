import {
  defaultFont,
  dangerColor,
  whiteColor,
  blackColor
} from "assets/jss/material-dashboard-react.js";

import dropdownStyle from "assets/jss/material-dashboard-react/dropdownStyle.js";

const headerLinksStyle = theme => ({
  ...dropdownStyle(theme),
  search: {
    "& > div": {
      marginTop: "0"
    },
    [theme.breakpoints.down("sm")]: {
      margin: "10px 15px !important",
      float: "none !important",
      paddingTop: "1px",
      paddingBottom: "1px",
      padding: "0!important",
      width: "60%",
      marginTop: "40px",
      "& input": {
        color: whiteColor
      }
    }
  },
  linkText: {
    zIndex: "4",
    ...defaultFont,
    fontSize: "14px",
    margin: "0px"
  },
  navText: {
    zIndex: "4",
    ...defaultFont,
    fontSize: "18px",
    margin: "5px auto",
  },
  item: {
    position: "relative",
    display: "inline-block",
    textDecoration: "none",
    "&:hover,&:focus,&:visited,&": {
      color: blackColor
    }
  },
  itemIconRTL: {
    marginRight: "3px",
    marginLeft: "15px",
    float: "right"
  },
  itemLink: {
    width: "auto",
    transition: "all 300ms linear",
   // margin: "10px 15px 0",
    borderRadius: "3px",
    position: "relative",
    display: "block",
    padding: "10px 16px",
    textAlign: "center",

    backgroundColor: "transparent",
    ...defaultFont
  },
  itemIcon: {
    width: "30px",
    height: "35px",
    fontSize: "24px",
    lineHeight: "30px",
   // float: "left",
   // marginRight: "15px",
    textAlign: "center",
    verticalAlign: "middle",
    
  },
 
  itemText: {
    ...defaultFont,
    margin: "0",
    lineHeight: "30px",
    fontSize: "14px",
    color: 'inherit'
  },
  buttonLink: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      margin: "10px 15px 0",
      width: "-webkit-fill-available",
      "& svg": {
        width: "24px",
        height: "30px",
        marginLeft: "-15px",
        marginRight: "15px"
      },
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        fontSize: "24px",
        lineHeight: "30px",
        width: "24px",
        height: "30px",
        marginRight: "15px",
        marginLeft: "-15px"
      },
      "& > span": {
        justifyContent: "flex-start",
        width: "100%"
      }
    }
  },
  searchButton: {
    [theme.breakpoints.down("sm")]: {
      top: "-50px !important",
      marginRight: "22px",
      float: "right"
    }
  },
  margin: {
    zIndex: "4",
    margin: "0"
  },
  searchIcon: {
    width: "17px",
    zIndex: "4"
  },
  notifications: {
    zIndex: "4",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      top: "2px",
      border: "1px solid " + whiteColor,
      right: "4px",
      fontSize: "9px",
      background: dangerColor[0],
      color: whiteColor,
      minWidth: "16px",
      height: "16px",
      borderRadius: "10px",
      textAlign: "center",
      lineHeight: "16px",
      verticalAlign: "middle",
      display: "block"
    },
    [theme.breakpoints.down("sm")]: {
      ...defaultFont,
      fontSize: "14px",
      marginLeft: "8px"
    }
  },
  manager: {
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    display: "inline-block"
  },
  searchWrapper: {
    [theme.breakpoints.down("sm")]: {
      width: "-webkit-fill-available",
      margin: "10px 15px 0"
    },
    display: "inline-block"
  }
});

export default headerLinksStyle;
