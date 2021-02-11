import React from "react";
// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";
import FormFeild from "components/Form/FormFeild";
import Form from "views/Form/Form";
import { getCategories, getProductByID } from "../../../actions";
import { connect } from "react-redux";
import Snackbar from "components/Snackbar/Snackbar";
import { creatProduct, updateProduct } from "../../../actions";
import { Redirect } from "react-router-dom";

const imgsArray = [
  "https://orboon.s3.ap-south-1.amazonaws.com/product-4-1613080541780.jpg",
 ];
class CreateProduct extends Form {
  constructor() {
    super();
    this.state = {
      formPending: false,
      create: true,
      redirect: false,
      formError: false,
      formErrorMessage: "",
      formSuccess: "",
      formData: {
        photos: {
          element: "file",
          value: imgsArray,
          config: {
            name: "photos_input",
            type: "file",
            companyType:""
          },
          validation: {
            ArrayRequired: true,
          },
          valid: null,
          touched: false,
          validationMessage: "",
          label: " صور",
        },
        name: {
          element: "input",
          value: "",
          config: {
            name: "name_input",
            type: "name",
          },
          validation: {
            required: true,
          },
          valid: null,
          touched: false,
          validationMessage: "",
          label: "اسم المنتج",
        },
        description: {
          element: "input",
          value: "",
          config: {
            name: "description_input",
            type: "text",
          },
          validation: {
            required: true,
          },
          valid: null,
          touched: false,
          validationMessage: "",
          label: "الوصف",
        },
       
        categoryName: {
          element: "select",
          value: "",
          config: {
            label: "اختار الصنف",
            name: "categoryName_input",
            options: [],
          },
          validation: {
            required: true,
          },
          valid: null,
          touched: false,
          validationMessage: "",
          showLabel: true,
        },
        price: {
          element: "input",
          value: "",
          config: {
            name: "price_input",
            type: "number",
          },
          validation: {
            required: true,
          },
          valid: null,
          touched: false,
          validationMessage: "",
          label: "السعر ",
        },
      
        hasQuarter: {
          element: "checkbox",
          value: false,
          config: {
            name: "hasQuarter",
            type: "checkbox",
          },
          validation: {
            
          },
          valid: null,
          touched: false,
          validationMessage: "",
          label: "ريع ",
        },
        hasHalf: {
          element: "checkbox",
          value: false,
          config: {
            name: "hasHalf",
            type: "checkbox",
          },
          validation: {
            
          },
          valid: null,
          touched: false,
          validationMessage: "",
          label: "نص ",
        },
      
      
        assets: {
          element: "input",
          value: "",
          config: {
            name: "assets_input",
            type: "text",
          },
          validation: {
            required: false,
          },
          valid: null,
          touched: false,
          validationMessage: "",
          label: "مميزات المنتج (افصل بين كل كلم ب-) ",
        },
      },
      notificationError: true,
    };
  }
  componentDidMount() {
    this._isMounted = true;

    this.props
      .getCategories()
      .then((res) => {
        const nwFormData = { ...this.state.formData };
        nwFormData.categoryName.config.options = res;
        this._isMounted &&
          this.setState({
            formData: nwFormData,
          });
      })
      .catch((err) => {
        this.setState({
          formError: true,
          formErrorMessage:  "خطأ في جلب خيارات الأصناف",
        });
      });
    const id = this.props.match.params.id;
    if (id === "new") {
      return;
    }
    this.props
      .getProductByID(id)
      .then((res) => {
        const nwFormData = { ...this.state.formData };
        Object.keys(nwFormData).forEach((key, i) => {
          if (key !== "orboon" && key !== "percentage" && key !== "categoryName") {
            nwFormData[key].value = res[key];
          } 
          else if (key === "categoryName") {
            nwFormData[key].value = res["categoryName"]._id;
          }
        });
        this._isMounted &&
          this.setState({
            formData: nwFormData,
            create: false,
          });
      })
      .catch((err) => {
        this.setState({
          create: false,
          formError: true,
          formErrorMessage: err[0]
            ? err[0].message
            : "خطأ    في جلب تفاصيل المنتج",
        });
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  emptyErrors = () => {
    //when input change
    const { errors } = this.props;
    if (errors && errors.length > 0) {
      this.props.resetErrors();
    }
  };
  submitAction = (data) => {
    ///this.props.loginAction(data);
    console.log(data);
    const { assets } = { ...data };
    console.log(assets);

    if (!(assets.constructor === Array)) {
       
      const assetsArray = assets.split(/[\-,]+/);
      data.assets = assetsArray;
    }
    const { create } = this.state;
    this.setState({ formPending: true });
    if (create) {
      creatProduct({ ...data }, "").then(
        (created) => {
          this.setState({ redirect: true });
        },
        (errors) => {
          this.setState({
            formError: true,
            notificationError: true,
            formErrorMessage: errors[0].message,
          });
        }
      );
    } else {
      console.log("edited");
       
      updateProduct("", this.props.match.params.id, {
        ...data,
      }).then(
        (updated) => {
          this.setState({ formPending: false, redirect: true });
        },
        (errors) => {
          this.setState({
            formError: true,
            notificationError: true,
            formPending: false,
            formErrorMessage: errors ? errors[0].message : "خطأ غير معروف",
          });
        }
      );
    }
  };
  showNotification = (message, color) => {
    // setTimeout(() => {
    //   this.setState({ notificationError: false });
    // }, 3000);

    return (
      <Snackbar
        place="tl"
        color={color}
        message={`${message}`}
        open={this.state.notificationError}
        closeNotification={() => this.setState({ notificationError: false })}
        close
      />
    );
  };
  renderFormFeilds = () => {
    const feilds = Object.keys(this.state.formData);

    return feilds.map((feild, i) => (
      <GridContainer key={i}>
        <GridItem xs={12} sm={12} md={12}>
          <FormFeild
            id={feild}
            formData={this.state.formData[feild]}
            change={(element) => this.updateForm(element)}
            isError={this.state.formError}
          />
        </GridItem>
      </GridContainer>
    ));
  };
  render() {
    const { errors, productDetail, isLoading } = this.props.productDetail;
    const {
      create,
      formError,
      formErrorMessage,
      redirect,
      formPending,
    } = this.state;
    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: "/majel/products",
            state: { status: create ? "create" : "edit" },
          }}
        />
      );
    }
    return (
      <>
        {/* {errors &&
          errors.length > 0 &&
          this.showNotification(errors[0].message, "danger")} */}
        {formError && this.showNotification(formErrorMessage, "danger")}
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="info">
                <h4 className="cardTitleWhite">
                  {create ? "إضافة منتج" : "تعديل المنتج"}
                </h4>
                <p className="cardCategoryWhite">عدل المنتج</p>
              </CardHeader>
              <CardBody>{this.renderFormFeilds()}</CardBody>
              <CardFooter>
                <Button
                  disabled={formPending}
                  onClick={this.submitForm}
                  color="info"
                >
                  {formPending ? "تحميل..." : create ? "إضافة " : "تعديل "}
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
         </GridContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  productDetail: state.productDetail,
});

const mapDispatchToProps = {
  getCategories,
  getProductByID,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
