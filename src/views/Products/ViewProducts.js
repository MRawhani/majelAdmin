import React, { Component } from "react";
import { connect } from "react-redux";
import CustomCard from "../../components/CustomCard/CustomCard";
import { getProducts } from "../../actions";

import Skeleton from "@material-ui/lab/Skeleton";
import Search from "@material-ui/icons/Search";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { Link } from "react-router-dom";
import CustomInput from "components/CustomInput/CustomInput";

function ViewProducts(props) {
  const editProduct = () => {
    console.log("edit");
  };
  const deleteProduct = () => {
    console.log("delete");
  };

  console.log("render");

  const { products, isLoading, renderCards, linkTo, onSearch ,inputValue} = props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <form>
          <CustomInput
            formControlProps={{
              className: "",
            }}
            inputProps={{
              placeholder: "بحث...",
              inputProps: {
                "aria-label": "Search",
              },
            }}
            value={inputValue}
            onChange={(event) => onSearch(event)}
          />
          <Button
            onClick={onSearch}
            color="white"
            aria-label="edit"
            justIcon
            round
          >
            <Search />
          </Button>
        </form>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className="cardTitleWhite">المنتجات</h4>
            <p className="cardTitleWhite">ادارة المنتجات</p>
          </CardHeader>
          <CardBody>
            {isLoading ? (
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <Skeleton variant="text" width={210} />
                  <Skeleton variant="rect" width={210} height={118} />
                  <Skeleton variant="text" width={210} />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <Skeleton variant="text" width={210} />
                  <Skeleton variant="rect" width={210} height={118} />
                  <Skeleton variant="text" width={210} />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <Skeleton variant="text" width={210} />
                  <Skeleton variant="rect" width={210} height={118} />
                  <Skeleton variant="text" width={210} />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <Skeleton variant="text" width={210} />
                  <Skeleton variant="rect" width={210} height={118} />
                  <Skeleton variant="text" width={210} />
                </GridItem>
              </GridContainer>
            ) : (
              <GridContainer>{renderCards()}</GridContainer>
            )}
          </CardBody>
          <CardFooter>
            <Link to={linkTo}>
              <Button color="info">اضافة منتج</Button>
            </Link>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

const mapStateToProps = (state) => ({
  products: state.products,
});

const mapDispatchToProps = {
  getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProducts);
