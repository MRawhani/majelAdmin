import React, { Component } from "react";
import Button from "components/CustomButtons/Button";

import { DropzoneArea } from "material-ui-dropzone";
import Danger from "components/Typography/Danger";
import Success from "components/Typography/Success";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Delete from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { uploadImage } from "../../actions";

import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
export default class FileUpload extends Component {
  constructor() {
    super();

    this.state = {
      selectedFiles: [],
      previousSelectedFiles: [],
      imageBase64: "",
      pending: false,
      status: "INIT",
      message: "",
      disabled: false,
      key: 1,
      values: [],
      renderImages: false,
    };
  }
  componentDidMount() {
    
    if (this.props.value) {
      this.setState({
        values: this.props.value,
        renderImages: true,
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        values: this.props.value,
        renderImages: true,
      });
    }
  }
  onChange = (files) => {
    const selectedFiles = files;

    if (selectedFiles) {
      this.setState({
        selectedFiles,
      });
    }
  };
  onSuccess = (imgs, selectedFiles) => {
    // const { onChange } = this.props.input || this.props;
    let vLength;
    let iLength;
    try {
      vLength = this.state.values.length;
      iLength = imgs.length;
      
    } catch (error) {
      return this.onError("خطأ");
    }
    if (vLength + iLength <= 3) {
      this.props.onChange([...this.state.values, ...imgs]);
      this.setState({
        pending: false,
        status: "DONE",
        disabled: true,
        //values: [...this.state.values, ...imgs],
        message: "تم الرفع",
        previousSelectedFiles: selectedFiles,
      });
    } else {
      this.onError("الحد الأقصى 3 صور، إحذف من الصور لتضيف اخرى");
    }
  };
  renderSpinning = () => {
    const { pending } = this.state;
    if (pending) {
      return (
        <div className="img-loading-overlay">
          <div className="img-spinning-circle"></div>
        </div>
      );
    }
  };
  renderImageStatus = () => {
    const { status } = this.state;
    if (status === "DONE") {
      return <div className="alert alert-success">تم الرفع</div>;
    }
    if (status === "FAIL") {
      return <div className="alert alert-danger">خطأ في الرفع</div>;
    }
  };
  onError = (err) => {
    this.setState({
      pending: false,
      status: "FAIL",
      message: err || "لم يتم الرفع",
    });
  };
  upload = (e) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (e.length > 0) {
          resolve(e);
        } else {
          reject("error");
        }
      }, 3000);
    });
  };
  isSameArray = (arr1, arr2) => {
    if (!arr1 || !arr2) return;

    let result;

    arr1.forEach((e1, i) =>
      arr2.forEach((e2) => {
        if (e1.length > 1 && e2.length) {
          result = this.isSameArray(e1, e2);
        } else if (e1 !== e2) {
          result = false;
        } else {
          result = true;
        }
      })
    );

    return result;
  };
  uploadImage = () => {
    const { selectedFiles, previousSelectedFiles } = this.state;
    if (selectedFiles) {
      if (selectedFiles.length <= 0) {
        this.onError("لم تقم بإختيار الملفات");
      } else if (
        selectedFiles.length > 0 &&
        !this.isSameArray(selectedFiles, previousSelectedFiles)
      ) {
        this.setState({ pending: true, status: "INIT" });
        uploadImage(selectedFiles,this.props.companyType||'events')
          .then((uploadedImage) => {
            
            this.onSuccess(
              uploadedImage && uploadedImage.locationArray,
              selectedFiles
            );
          })
          .catch((error) => {
            
            this.onError(error ? error[0].message : 'خطأ غير معروف');
          });
      } else {
        this.onError("لقد رفعت الملقات مسبقاً");
      }
    }
  };
  removeProductToEdit = (e) => {
    const { values } = { ...this.state };
    const nwValues = values.filter((value) => value != e);
    this.props.onChange(nwValues);
    // this.setState({
    //   values: nwValues,
    // });
  };

  renderImagesToView = () => {
    const { values } = { ...this.state };
    const { value } = this.props;
    
    //let array = values.length > 0 ? values: value
    return (
      <GridContainer className="">
        {values.map((e, i) => (
          <GridItem kry={i} xs={12} sm={4} md={4}>
            <img style={{ height: "90px" }} src={`${e}`} alt="عربون" />
            <IconButton
              onClick={() => this.removeProductToEdit(e)}
              aria-label="delete"
            >
              <Delete />
            </IconButton>
          </GridItem>
        ))}
      </GridContainer>
    );
  };
  render() {
    const { value, onChange, error, success, errorMessage } = this.props;
    const {
      disabled,
      selectedFiles,
      message,
      pending,
      status,
      values,
      renderImages,
    } = this.state;
    return (
      <>
        {renderImages && this.renderImagesToView()}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          {
            <Button
              style={{ marginLeft: "5px" }}
              onClick={this.uploadImage}
              color="info"
              disabled={pending}
            >
              {pending ? "قيد الرفع..." : "رفع"}
            </Button>
          }
          {status === "FAIL" && <Danger> {message} </Danger>}
          {status === "DONE" && <Success> {message}</Success>}

          <div
            style={{
              color: "red",
              justifySelf: "flex-end",
              position: "absolute",
              left: "0",
              display: "flex",
              alignItems: "center",
            }}
          >
            {error && (
              <>
                {" "}
                <Danger> {errorMessage} </Danger>
                <Clear
                  style={{
                    color: "red",
                  }}
                />
              </>
            )}
            {success && (
              <Check
                style={{
                  color: "green",
                }}
              />
            )}
          </div>
        </div>
        <DropzoneArea
          key={this.state.key}
          filesLimit={3 - values.length || 3}
          acceptedFiles={["image/*"]}
          dropzoneText={`${
            values.length >= 3
              ? `(تم رفع ${values.length} ملفات)`
              : `قم بالضغط او السحب لإضافة الصور`
          }`}
          onChange={this.onChange}
          inputProps={{ disabled: values.length >= 3 }}
          showFileNames
          getFileLimitExceedMessage={(filesLimit) =>
            `${filesLimit} هو العدد المسموح رفعه من الصورة`
          }
          getFileAddedMessage={(fileAdded) => `${fileAdded} تمت اضافته`}
          // initialFiles={value}
        />
      </>
    );
  }
}
