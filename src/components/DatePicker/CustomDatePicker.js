import moment from "moment";
import MomentUtils from "@date-io/moment";
import MoreIcon from "@material-ui/icons/MoreVert";
import React, { useState, useCallback } from "react";
import { Check, Clear } from "@material-ui/icons";
import { FormHelperText } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "moment/locale/ar";

// it is required to select default locale manually

function CustomDatePicker(props) {
  const [locale, setLocale] = useState("fr");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleMenuOpen = useCallback((e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }, []);

  const selectLocale = useCallback((locale) => {
    moment.locale(locale);

    setLocale(locale);
    setAnchorEl(null);
  }, []);

  return (
    <>
     <div className="time">
    <MuiPickersUtilsProvider
      libInstance={moment}
      utils={MomentUtils}
      locale={"ar"}
    >
      <DatePicker
      placeholder="GG.AA.YYYY SS:DD"
        value={props.selectedDate}
        onChange={(date) => props.handleDateChange(date)}
        variant="inline"
        format=" dddd YYYY/M/D"
        margin="normal"
        id={props.id}
        label={props.title}

        //  showTodayButton={true}
        // InputProps={{
        //   endAdornment: (
        //     <IconButton
        //       aria-label="Select locale"
        //       onClick={handleMenuOpen}
        //       aria-owns={anchorEl ? "locale-menu" : undefined}
        //     >
        //       <MoreIcon />
        //     </IconButton>
        //   ),
        // }}
      />

      {/* <Menu
        id="locale-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {Object.keys(localeMap).map(localeItem => (
          <MenuItem
            key={localeItem}
            selected={localeItem === locale}
            onClick={() => selectLocale(localeItem)}
          >
            {localeItem}
          </MenuItem>
        ))}
      </Menu> */}
    </MuiPickersUtilsProvider>
      {props.error ? (
        <>
         

          <Clear  style={{
                  color: "red",
                }} />
        </>
      ) : props.success ? (
        <Check style={{
          color: "green",
        }}/>
      ) : null}
    </div>
       <FormHelperText error id="component-error-text">
       {props.errorMessage}
     </FormHelperText>
     </>
  );
}

export default CustomDatePicker;
