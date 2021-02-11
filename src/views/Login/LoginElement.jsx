import React, { Component } from "react";

import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
//material ui elements

///core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import { loginAction, resetErrors } from "./../../actions";

import Form from "../Form/Form";
import authService from "../../services/auth-service";
import FormFeild from "../../components/Form/FormFeild";
import Snackbar from "components/Snackbar/Snackbar";

class FormELement extends Form {
  constructor(props) {
    super(props);
    this.state = {
      formError: false,
      formErrorMessage: "",
      formSuccess: "",
      formData: {
        email: {
          element: "input",
          value: "",
          config: {
            name: "email_input",
            type: "email",
          },
          validation: {
            required: true,
            email: true,
          },
          valid: null,
          touched: false,
          validationMessage: "",
          label: "ايميلك",
        },
        password: {
          element: "input",
          value: "",
          config: {
            name: "password_input",
            type: "password",
          },
          validation: {
            required: true,
          },
          valid: null,
          touched: false,
          validationMessage: "",
          label: "كلمة السر",
        },
      },
      notificationError: true,
    };
  }
  emptyErrors = () => {
    //when input change
    const { errors } = this.props.auth;
    if (errors && errors.length > 0) {
      this.props.resetErrors();
    }
  };
  submitAction = (data) => {
    this.props.loginAction(data,this.props.loginType);
    console.log(data);
  };
  showNotification = (message, color) => {
    const { errors } = this.props.auth;

    setTimeout(() => {
      this.props.resetErrors();
    }, 2000);
     
    return (
      <Snackbar
        place="tl"
        color={color}
        message={`${message}`}
        open={true}
        closeNotification={() => this.props.resetErrors()}
        close
      />
    );
  };
  render() {
    const { errors, isAuth, isLoading,title } = this.props.auth;
    const { classes } = this.props;
    if (authService.isAuthenticated() && isAuth) {
      return    <Redirect to={{ pathname: `/`}} />;
   

    }
    return (
      <>
      
        {errors&& errors.length>0 && this.showNotification(errors[0] ? errors[0].message : "خطأ","danger")}


        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>سجل دخولك</h4>
          <p className={classes.cardCategoryWhite}>{this.props.title}</p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <FormFeild
                  id={"email"}
                  formData={this.state.formData.email}
                  change={(element) => this.updateForm(element)}
                  isError={this.state.formError}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <FormFeild
                  id={"password"}
                  formData={this.state.formData.password}
                  change={(element) => this.updateForm(element)}
                  isError={this.state.formError}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button onClick={this.submitForm} color="info" disabled={isLoading}>
              {isLoading ? "تحميل..." : "دخول"}
            </Button>
          </CardFooter>
        </Card>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { loginAction, resetErrors })(
  FormELement
);
