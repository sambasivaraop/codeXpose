import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { appReducer, authReducer } from "../reducers";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware, routerReducer } from "react-router-redux";
import { questionsStore } from "./questions";
import { authStore } from "./auth";
import { testStore } from "./test";
import { userStore } from "./users";

const initalState = {
  ...questionsStore,
  ...authStore,
  ...testStore,
  ...userStore
};
export const rootReducers = combineReducers({
  ...appReducer,
  ...authReducer,
  router: routerReducer
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

export const history = createHistory();

const middlewares = composeEnhancers(
  applyMiddleware(thunk, routerMiddleware(history))
);

export const store = createStore(rootReducers, initalState, middlewares);
