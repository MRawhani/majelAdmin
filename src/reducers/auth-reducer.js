import { LOGIN_INIT,LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT,RESET_ERRORS } from "./../actions/types";
let INITIAL_STATE = {
  isAuth: false,
  errors: [],
  userData:{},
  isAdmin: false,
  isLoading:false
};
export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_INIT:
      return {
        ...state,
       isLoading:true
       
      };
      break;
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        errors: [],
        isLoading:false,
        userData: action.payload,
       
      };
      break;
    case LOGIN_FAILURE:
       
      return {
        ...state,
       isAuth:false,
        errors: action.payload,
        isLoading:false
      };
    case LOGOUT:
     return{

      isAuth: false,
      errors: [],
      userData:{},
      isLoading:false
     
     }
     case RESET_ERRORS:
          return{
     ...state,
         
           errors: [],
          
          
          }
    default:
      return state;
  }
};
