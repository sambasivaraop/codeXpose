import * as authActions from "../actions/auth";

export const loginReducers = {
  authPending: (state = null, action) => {
    switch (action.type) {
      case authActions.LOGIN_PENDING:
        return action.payload.isPending;
      case authActions.LOGOUT_PENDING:
        return action.payload.isPending;
      default:
        return state;
    }
  },
  authToken: (state = "", action) => {
    switch (action.type) {
      case authActions.LOGIN_SUCCESS:
        return action.payload.token;
      case authActions.LOGOUT_SUCCESS:
        return action.payload.data;
      default:
        return state;
    }
  },
  authError: (state = "", action) => {
    switch (action.type) {
      case authActions.LOGIN_FAIL:
        return action.payload.error;
      case authActions.LOGOUT_FAIL:
        return action.payload.error;
      default:
        return state;
    }
  },
  testID: (state = "", action) => {
    switch (action.type) {
      case authActions.GET_TEST_ID:
        return action.payload.id;
      default:
        return state;
    }
  }
};
