import * as userActions from "../actions/users";

export const userReducers = {
  userPending: (state = null, action) => {
    switch (action.type) {
      case userActions.ADD_USER_PENDING:
        return action.payload.isPending;
      case userActions.GET_USER_PENDING:
        return action.payload.isPending;
      default:
        return state;
    }
  },
  userSuccess: (state = null, action) => {
    switch (action.type) {
      case userActions.ADD_USER_SUCCESS:
        return action.payload.data;
      default:
        return state;
    }
  },
  userFail: (state = null, action) => {
    switch (action.type) {
      case userActions.ADD_USER_FAIL:
        return action.payload.error;
      case userActions.GET_USER_FAIL:
        return action.payload.error;
      default:
        return state;
    }
  },
  userData: (state = [], action) => {
    switch (action.type) {
      case userActions.GET_USER_SUCCESS:
        return action.payload.data;
      default:
        return state;
    }
  }
};
