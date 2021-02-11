import { GLOBAL_PROPS } from "../actions/types";
let INITIAL_STATE = {
  globalProps:{}
};
export const globalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GLOBAL_PROPS:
      return {
        ...state,
       ...action.payload
      };

    default:
      return state;
  }
};
