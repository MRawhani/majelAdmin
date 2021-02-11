import axios from "axios";
import {
  LOGIN_INIT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  GLOBAL_PROPS,
  RESET_ERRORS,
  GET_PRODUCTS_INIT,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_CLEAR,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_INIT,
  GET_PRODUCT_BY_ID_FAILURE,
  GET_PRODUCT_BY_ID_CLEAR,
  GET_PRODUCTS_SEARCH,
} from "./types";
import authService from "../services/auth-service";

import axiosService from "../services/axios-service";
const apiUrl = process.env.REACT_APP_API_URL;
const axiosInstance = axiosService.getInstance();

const returnError = (err) => {
  return err.response
    ? err.response.data.errors
      ? err.response.data.errors.length >0?err.response.data.errors:[{message:"خطأ غير معروف"}]
      : [{ message: err.message }]
    : [{ message: err.message }];
};

export const setGlobalProps = (data) => {
  return {
    type: GLOBAL_PROPS,
    payload: data,
  };
};
////////////////////////////////Login
const loginSuccess = () => {
  const username = authService.getUsername();
  return {
    type: LOGIN_SUCCESS,
    payload: username,
  };
};
const loginfailure = (errors) => {
  
  return {
    type: LOGIN_FAILURE,
    payload: errors,
  };
};
export const checkAuth = () => (dispatch) => {
  if (authService.isAuthenticated()) {
    dispatch(loginSuccess());
  }
};
// another way of setting thunk's dispatch
export const loginAction = (userData,type) => {
   
  return (dispatch) => {
    dispatch({ type: LOGIN_INIT });
    axios
      .post(`${apiUrl}/companies/login-company`, userData)

      .then((res) => {
        
        authService.saveToken(res.data.token);
        dispatch(loginSuccess());
      })
      .catch((err) => {
        dispatch(
          loginfailure(returnError(err)
          )
        );
      });
  };
};

export const logout = () => {
  authService.removeToken();

  return {
    type: LOGOUT,
  };
};
export const resetErrors = () => {
  return { type: RESET_ERRORS };
};

////////////////////////////booking
export const getBookings = (page, pageSize, orderBy, orderDirection,filters, date,type) => (
  dispatch
) => {
   const filterInput=[]
   if(filters.length>0){
filters.forEach(element => {
  const obj ={}
  obj[element.column.field] = element.value
     filterInput.push({field:element.column.field,value:element.value})
      
    });
  }
  console.log('ddd');

  return axiosInstance
    .post(
      `${apiUrl}/bookings/getBookingsPerDate?perPage=${pageSize}&page=${page}&orderBy=${
        orderBy ? orderBy.field : "createdAt"
      }&orderDirection=${orderDirection ? orderDirection : "asc"}`,
      {date:date,filterInput}
    )
    .then((res) => res.data)
    .then((result) => {
      return {
        data: result.data,
        page: result.page,
        totalCount: result.totalCount,
        totalPrice: result.totalPrice
      };
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(returnError(err));
    });
};

export const editBooking = (data, id,type) => dispatch=>{
  return axiosInstance
    .patch(`${apiUrl}/bookings/editBooking/${id}`, {...data})
    .then((res) => res.data)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return Promise.reject(returnError(err));
    });
};
//////////////////////////products
export const searchProducts = (products, searchValue) => (dispatch) => {
  
  const neProducts =
    products && products.length > 0
      ? products.filter((product) => product.name.includes(searchValue))
      : [];
  dispatch({
    type: GET_PRODUCTS_SEARCH,
    payload: { searchProducts: neProducts, prevProducts: products },
  });
};
export const getProducts = (url) => (dispatch) => {
  dispatch({ type: GET_PRODUCTS_INIT });
  return axiosInstance
    .get(`${apiUrl}/products/get`)
    .then((result) => {
       
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: result.data.data.products });
    })
    .catch((err) => {
      dispatch({
        type: GET_PRODUCTS_FAILURE,
        payload: err.response
          ? err.response.data.errors
          : [{ detail: err.message }],
      });
    });
};

export const getCategories = (type) => (dispatch) => {
  return axios
    .get(`${apiUrl}/categories`)
    .then((categories) => {
       
      return categories.data;
    })
    .catch((err) => {
       
      return Promise.reject(
       returnError(err)
      );
    });
};

export const uploadImage = (images,type) => {
  let formData = new FormData();
  // formData.append("galleryImage", image);
  if (images) {
    for (let i = 0; i < images.length; i++) {
      formData.append("galleryImage", images[i], images[i].name);
    }
  }
  
  return axiosInstance
    .post(`${apiUrl}/images-upload`, formData)
    .then((response) => {
      
      console.log(response);
      return response.data;
      if (200 === response.status) {
        // If file size is larger than expected.
        // if (response.data.error) {
        //   if ("LIMIT_FILE_SIZE" === response.data.error.code) {
        //     return Promise.reject(
        //        [{ message: "حجم الملفات كبير" }]
        //     );
        //   } else if ("LIMIT_UNEXPECTED_FILE" === response.data.error.code) {
        //     return Promise.reject(
        //       [{ message: "  " }]
        //    );
        //   } else {
        //     // If not the given ile type
        //     console.log(response.data.error);
        //   }
        // } else {
        //   // Success
        //   let fileName = response.data;
        //   console.log("fileName", fileName);
        //   console.log("File Uploaded");
        // }
      }

      // return json.data.imageUrl;
    })
    .catch((err) => {
      return Promise.reject(
        err.response
          ? err.response.data.errors
            ? err.response.data.errors
            : [{ message: err.message }]
          : [{ message: err.message }]
      );
    });
};

export const creatProduct = (rentalData, type) => {
  
  return axiosInstance.post(`${apiUrl}/products/add`, rentalData).then(
    (res) => {
      return res.data;
    },
    (err) => {
      return Promise.reject(
        returnError(err)
      );
    }
  );
};

export const getProductByID = (id,type) => (dispatch) => {
  dispatch({ type: GET_PRODUCT_BY_ID_INIT });

  return axios
    .get(`${apiUrl}/products/getById/${id}`)
    .then((res) => {
      dispatch({
        type: GET_PRODUCT_BY_ID_SUCCESS,
        payload: res.data.foundProduct,
      });
      return res.data.foundProduct;
    })
    .catch((err) => {
      dispatch({
        type: GET_PRODUCT_BY_ID_FAILURE,
        payload: err.response
          ? err.response.data.errors
          : [{ message: err.message }],
      });
      return Promise.reject(
        err.response ? err.response.data.errors : [{ message: err.message }]
      );
    });
};
export const updateProduct = (type, id, productData) => {
  
  return axiosInstance.patch(`${apiUrl}/products/edit/${id}`, productData).then(
    (res) => {
      return res.data;
    },
    (err) => {
      return Promise.reject(
        err.response
          ? err.response.data.errors
            ? err.response.data.errors
            : [{ message: err.message }]
          : [{ message: err.message }]
      );
    }
  );
};

///receipts
export const getReceipts = (page, perPage, sortBy, order,type, filterData) =>  {
  
  return axiosInstance
    .post(
      `${apiUrl}/receipts/get${type}Receipts?perPage=${perPage ?perPage:5}&page=${page?page:0}&sortBy=${
        sortBy ? sortBy : "no"
      }&order=${order || 'desc'}`,
      { ...filterData }
    )
    .then((res) => res.data)
    .then((result) => {
      return {
        data: result.data,
        page: result.page,
        totalCount: result.totalCount,
        totalPrice: result.totalPrice
      };
    })
    .catch((err) => {
      return Promise.reject(returnError(err));
    });
};


///incomes
export const getIncomes = (page, perPage, sortBy, order,type, filterData) =>  {
 
  return axiosInstance
    .post(
      `${apiUrl}/incomes/get${type}Incomes?perPage=${perPage ?perPage:5}&page=${page?page:0}&sortBy=${
        sortBy ? sortBy : "no"
      }&order=${order || 'desc'}`,
      { ...filterData }
    )
    .then((res) => res.data)
    .then((result) => {
      return {
        data: result.data,
        page: result.page,
        totalCount: result.totalCount,
        totalPrice: result.totalPaid,
        totalCut: result.totalCut,
        totalProfit: result.totalProfit,
      };
    })
    .catch((err) => {
      return Promise.reject(returnError(err));
    });
};



// stats 
export const getFullStats = (type) =>  {
 
  return axiosInstance
    .get(
      `${apiUrl}/company/find${type}FullStats`
    )
    .then((res) => res.data)
    .then((result) => {
      return result
    })
    .catch((err) => {
      return Promise.reject(returnError(err));
    });
};
export const getBookingsStatsByWeek = (type) =>  {
 
  return axiosInstance
    .get(
      `${apiUrl}/${type}/findTotalBookingsByWeek`
    )
    .then((res) => res.data)
    .then((result) => {
      return result
    })
    .catch((err) => {
      return Promise.reject(returnError(err));
    });
};
export const getProfitsStatsByWeek = (type) =>  {
 
  return axiosInstance
    .get(
      `${apiUrl}/company/find${type}ProfitsByWeek`
    )
    .then((res) => res.data)
    .then((result) => {
      
      return result
    })
    .catch((err) => {
      return Promise.reject(returnError(err));
    });
};

export const getVisitsByWeek = (type) =>  {
 
  return axiosInstance
    .get(
      `${apiUrl}/company/find${type}VisitsByWeek`
    )
    .then((res) => res.data)
    .then((result) => {
      
      return result
    })
    .catch((err) => {
      return Promise.reject(returnError(err));
    });
};
