import React from "react";

import checkboxAdnRadioStyle from "../../assets/jss/material-dashboard-react/checkboxAdnRadioStyle";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

// @material-ui/icons

import Check from "@material-ui/icons/Check";
// core components

const useStyles = makeStyles(checkboxAdnRadioStyle);

export default function CustomCheckbox(props) {
   
  const classes = useStyles();
  const [checked, setChecked] = React.useState(props.value);
  const handleToggle = (value) => {
     
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <Checkbox
      checked={props.value}
      tabIndex={-1}
      onClick={() => props.onChange(!props.value)}
      checkedIcon={<Check className={classes.checkedIcon} />}
      icon={<Check className={classes.uncheckedIcon} />}
      classes={{
        checked: classes.checked,
        root: classes.root,
      }}
    />
  );
}
