import {
 GET_PRODUCTS_INIT,
 GET_PRODUCTS_FAILURE,
 GET_PRODUCTS_SUCCESS,
 GET_PRODUCTS_CLEAR,
 GET_PRODUCT_BY_ID_SUCCESS,
 GET_PRODUCT_BY_ID_INIT,
 GET_PRODUCT_BY_ID_FAILURE,
 GET_PRODUCT_BY_ID_CLEAR,
 GET_PRODUCTS_SEARCH
} from "../actions/types";
let INITIAL_STATE = {
  Products: {
    products: [],
   
    isLoading: false,
    errors: [],
  },
  product:{
    productDetail:{},
    isLoading: false,
    errors: [],
  }
};
export const productsReducer = (state = INITIAL_STATE.Products, action) => {
  switch (action.type) {
    case GET_PRODUCTS_INIT:
      return {
        ...state,
      
        isLoading: true,
      };
    case GET_PRODUCTS_SUCCESS:
  
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        errors:[],
        searchProducts:undefined
      };
      case GET_PRODUCTS_FAILURE:
        return {
          ...state,
          products: [],
          isLoading: false,
          errors: action.payload,
          searchProducts:undefined
        };
        case GET_PRODUCTS_CLEAR:
      return {
      
        products: [],
        isLoading: false,
        errors: [],
        searchProducts:undefined
      };

      case GET_PRODUCTS_SEARCH:
        return {
        
        ...state,
        products:action.payload.prevProducts,
        isLoading: false,
        errors:[],
        searchProducts:action.payload.searchProducts
        };
  
    default:
      return state;
  }
};

export const productDetailReducer = (state = INITIAL_STATE.product, action) => {
  switch (action.type) {
    case GET_PRODUCT_BY_ID_INIT:
      return {
        ...state,
              isLoading: true,
      };
    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productDetail: action.payload,
        errors:[],
      };
    case GET_PRODUCT_BY_ID_FAILURE:
      return {
  
        productDetail: {},
        isLoading: false,
        errors: action.payload,
      };
 
    default:
      return state;
  }
}