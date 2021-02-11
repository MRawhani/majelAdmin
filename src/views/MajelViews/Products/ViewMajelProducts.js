import React, { Component } from "react";
import { connect } from "react-redux";
import CustomCard from "components/CustomCard/CustomCard";
import { getProducts, searchProducts } from "actions";

import GridItem from "components/Grid/GridItem.js";

import ViewProducts from "../../Products/ViewProducts";
import { Redirect } from "react-router-dom";

class ViewMajelProducts extends Component {
  constructor() {
    super();

    this.state = {
      searchValue: "",
    };
  }
  componentDidMount() {
     
    this.props.getProducts();
    if (this.props.location.state && this.props.location.state.searchValue) {
       
      this.setState({
        searchValue: this.props.location.state.searchValue,
      });
    }
  }

  editProduct = (e, id) => {
    console.log("edit");
     
    e.preventDefault();

    const { history } = this.props;
    history.push(`/majel/products/${id}`);
  };
  
  addRD = (e, id) => {
    console.log("edit");
     
  };
  deleteProduct = () => {
    console.log("delete");
  };
  renderCards = (productsRecieved) => {
    const { products, searchProducts } = this.props.products;
    const { searchValue } = this.state;

    if (!searchProducts && searchValue !== "") {
      this.props.searchProducts(
        this.props.products.products,
        this.state.searchValue
      );
    }
    const neProducts = searchProducts ? searchProducts : products;
    //   products &&
    //   products.length > 0 &&
    //   products.filter((product) =>
    //     product.name.includes(this.state.searchValue)
    //   );
     
    return neProducts && neProducts.length > 0
      ? neProducts.map((product, i) => (
          <GridItem key={i} xs={12} sm={12} md={4}>
            <CustomCard
              deleteProduct={() => this.deleteProduct()}
              editProduct={(e) => this.editProduct(e, product._id)}
              
              product={product}
            >
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </CustomCard>
          </GridItem>
        ))
      : "لايوجد";
  };
  onSearch = (e) => {
    console.log(e.target.value);
    this.setState(
      {
        searchValue: e.target.value,
      },
      () =>
        this.props.searchProducts(
          this.props.products.products,
          this.state.searchValue
        )
    );
  };
  // componentDidUpdate(){
  //   if(this.state.searchValue!=="")
  //   this.setState({
  //     searchValue:""
  //   })
  // }
  render() {
    const { products, isLoading } = this.props.products;
    return (
      <ViewProducts
        isLoading={isLoading}
      products={products}
        renderCards={this.renderCards}
        onSearch={this.onSearch}
        linkTo="/majel/products/new"
        inputValue={this.state.searchValue}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

const mapDispatchToProps = {
  getProducts,
  searchProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewMajelProducts);
