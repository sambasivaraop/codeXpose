import { questionsReducers } from "./questions";
import { testReducers } from "./test";
import { loginReducers } from "./auth";

export const appReducer = {
  ...questionsReducers,
  ...testReducers
};

export const authReducer = {
  ...loginReducers
};
