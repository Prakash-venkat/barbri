import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "../reducers";

export default function configureStore() {
  if (process.env.ENV !== "production") {
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
      combineReducers({ ...reducers }),
      composeEnhancers(applyMiddleware(thunk))
    );
  }

  return createStore(
    combineReducers({ ...reducers }),
    applyMiddleware(thunk)
  );
}
