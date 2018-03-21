import { questionsReducers } from "./questions";
import { loginReducers } from "./auth";

export const appReducer = {
  ...questionsReducers
};

export const authReducer = {
  ...loginReducers
};
