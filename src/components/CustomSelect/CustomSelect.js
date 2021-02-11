import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    paddingBottom: "10px",
    margin: "27px 0 0 0",
    position: "relative",
    verticalAlign: "unset",
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CustomSelect(props) {
  const classes = useStyles();
  const {
    formControlProps,
    label,
    id,
    labelProps,
    inputProps,
    error,
    success,
    onChange,
    value,
    type,
    name,
    disabled,
    errorMessage,
    options,
  } = props;
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl
        {...formControlProps}
        className={formControlProps.className + " " + classes.formControl}
        error={error}
        success={success}
      >
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          renderValue={(value) => {
            return options.filter((option) => {
              return option._id === value;
            })[0].name;
          }}
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          {options&& options.map((option, i) => (
            <MenuItem key={i} value={option._id}>
              {option.name || option.categoryName}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{error && errorMessage}</FormHelperText>
      </FormControl>
    </div>
  );
}
