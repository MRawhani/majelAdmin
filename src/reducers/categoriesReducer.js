import {
  GLOBAL_PROPS,
  GET_CATEGORIES_FAILURE,
  GET_CATEGORIES_INIT,
  GET_CATEGORIES_SUCCESS,
} from "../actions/types";
let INITIAL_STATE = {
  EventsCategories: {
    List: [],
    isLoading: false,
    errors: [],
  },
};
export const eventsCategoriesReducer = (state = INITIAL_STATE.EventsCategories, action) => {
  switch (action.type) {
    case GET_CATEGORIES_INIT:
      return {
        ...state,
        List:[],
        errors:[],
        isLoading: true,
      };
    case GET_CATEGORIES_SUCCESS:
  
      return {
        ...state,
        isLoading: false,
        List: action.payload.result,
        errors:[],
      };
    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        List: [],
        isLoading: false,
        errors: action.payload,
      };

    default:
      return state;
  }
};
