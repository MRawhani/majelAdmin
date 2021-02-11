import React from "react";
import CustomInput from "components/CustomInput/CustomInput";
import CustomSelect from "components/CustomSelect/CustomSelect";
import moment from "moment";
import FileUpload from "./FileUpload";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import CustomTimePicker from "../TimePicker/CustomTimePicker";
import CustomDatePicker from "../DatePicker/CustomDatePicker";
import Danger from "components/Typography/Danger";

export default function FormFeild({ id, formData, change, isError }) {
  const showMessage = () => {
    // let errorMessage = null;
    // let isValid = true;
    let error = { errorMessage: null, isValid: true };

    if (formData.validation && formData.valid === false) {
      error.isValid = false;
      error.errorMessage = formData.validationMessage;
    } else if (formData.valid === null) {
      error.isValid = null;
    }
    return error;
  };

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formData.element) {
      case "input":
        formTemplate = (
          <CustomInput
            labelText={formData.label}
            id={id}
            error={showMessage().isValid === false}
            success={showMessage().isValid === true}
            errorMessage={formData.validationMessage}
            value={formData.value}
            formControlProps={{
              fullWidth: true,
            }}
            {...formData.config}
            onChange={(event) => change({ event, id, blur: true })}
          />
        );
        break;
        case "checkbox":
          formTemplate = (
            <>
            <span>{formData.label}</span>
              <CustomCheckbox
                id={id}
                error={showMessage().isValid === false}
                errorMessage={formData.validationMessage}
                value={formData.value}
               
                {...formData.config}
                onChange={(event) =>
                  change({ event, id, type: formData.element, blur: true })
                }
              />
            </>
          );
          break;
          case "time":
        formTemplate = (
          <>
         <CustomTimePicker
         label={formData.label}
         id={id}
         error={showMessage().isValid === false}
         success={showMessage().isValid === true}
         errorMessage={formData.validationMessage}
         value={formData.value}
        
         {...formData.config}
         onChange={(event) => change({ event, id, type: formData.element,blur: true })}
         />
         {showMessage().isValid === false && <Danger>{formData.validationMessage}</Danger>}
</>
        );
        break;
        case "date":
        formTemplate = (
         <CustomDatePicker
         title={formData.label}
         selectedDate={formData.value ?formData.value : moment()}
         handleDateChange={(event) => change({ event, id, type: formData.element,blur: true })}
        
         id={id}
         error={showMessage().isValid === false}
         success={showMessage().isValid === true}
         errorMessage={formData.validationMessage}
         
         {...formData.config}
         />
        );
        break;
      case "select":
        formTemplate = (
          <CustomSelect
            id={id}
            error={showMessage().isValid === false}
            errorMessage={formData.validationMessage}
            value={formData.value}
            formControlProps={{
              fullWidth: true,
            }}
            {...formData.config}
            onChange={(event) => change({ event, id, blur: true })}
          />
        );
        break;
      case "file":
        formTemplate = (
          <FileUpload
            errorMessage={formData.validationMessage}
            id={id}
            error={showMessage().isValid === false}
            success={showMessage().isValid === true}
            value={formData.value}
            {...formData.config}
            onChange={(event) =>
              change({ event, id, type: formData.element, blur: true })
            }
          />
        );
        break;
      default:
        formTemplate = null;
    }
    return formTemplate;
  };
  return <div>{renderTemplate()}</div>;
}
