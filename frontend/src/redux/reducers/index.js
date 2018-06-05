import { questionsReducers } from "./questions";
import { testReducers } from "./test";
import { loginReducers } from "./auth";
import { userReducers } from "./users";

export const appReducer = {
  ...questionsReducers,
  ...testReducers,
  ...userReducers
};

export const authReducer = {
  ...loginReducers
};
