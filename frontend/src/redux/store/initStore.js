import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { appReducer, authReducer } from '../reducers';
import thunk from 'redux-thunk';
import { questionsStore  } from './questions';
import { authStore } from "./auth";

const initalState = {
    ...questionsStore,
    ...authStore
   };
export const rootReducers = combineReducers({
    ...appReducer,
    ...authReducer
});

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const middlewares = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducers,
    initalState,
    middlewares);