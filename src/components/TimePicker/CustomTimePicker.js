import React, { Fragment, useState } from "react";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Check, Clear } from "@material-ui/icons";
import { FormHelperText } from "@material-ui/core";
import "moment/locale/en-ca";

function CustomTimePicker(props) {
  const [selectedDate, handleDateChange] = useState(
    moment("2017-03-13" + " " + "08:00")
  );
   
  console.log(moment(selectedDate, "hh:mm").format("HH:mm").toString());
  console.log(moment(moment(selectedDate, "hh:mm").format("HH:mm"),"LT",true).isValid());

  return (
    <>
    <div className="time">
      
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}
      locale={"en-ca"}
      >
      <TimePicker
        clearable
        ampm={false}
        label={props.label}
        value={props.value!==null?moment("2017-03-13" + " " + props.value):null}
        minutesStep={30}
        onChange={props.onChange}
        disabled={props.disabled}
      />
    
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

export default CustomTimePicker;
