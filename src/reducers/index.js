import thunk from "redux-thunk";

import { authReducer } from "./auth-reducer";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { productsReducer,productDetailReducer } from "./productsReducer";
import {globalReducer} from "./global-reducer";


export const init = () => {
  const reducers = combineReducers({
    globalProps:globalReducer,
    auth: authReducer,
    products:productsReducer,
    productDetail:productDetailReducer
  });

  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));
  return store;
};
