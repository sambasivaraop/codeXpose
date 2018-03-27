import * as authActions from "../actions/auth";

export const loginReducers = {
  authPending: (state = null, action) => {
    switch (action.type) {
      case authActions.LOGIN_PENDING:
        return action.payload.isPending;
      default:
        return state;
    }
  },
  authToken: (state = "", action) => {
    switch (action.type) {
      case authActions.LOGIN_SUCCESS:
        return action.payload.token;
      default:
        return state;
    }
  },
  authError: (state = "", action) => {
    switch (action.type) {
      case authActions.LOGIN_FAIL:
        return action.payload.error;
      default:
        return state;
    }
  }
};
