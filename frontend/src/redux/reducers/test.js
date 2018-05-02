import * as testActions from "../actions/test";

export const testReducers = {
  isCompleted: (state = false, action) => {
    switch (action.type) {
      case testActions.TEST_COMPLETED:
        return action.payload.completed;
      case testActions.TEST_PENDING:
        return action.payload.pending;
      default:
        return state;
    }
  },
  testGetPending: (state = "", action) => {
    switch (action.type) {
      case testActions.TEST_GET_PENDING:
        return action.payload.isPending;
      default:
        return state;
    }
  },
  //   testGetsuccess: (state = "", action) => {
  //     switch (action.type) {
  //       case testActions.TEST_GET_SUCCESS:
  //         return action.payload.test_data;
  //       default:
  //         return state;
  //     }
  //   },
  testGetFail: (state = "", action) => {
    switch (action.type) {
      case testActions.TEST_GET_FAIL:
        return action.payload.error;
      default:
        return state;
    }
  },
  testData: (state = { id: 0, title: "", question: [] }, action) => {
    switch (action.type) {
      case testActions.TEST_GET_SUCCESS:
        // return action.payload.question_data;
        return Object.assign({}, state, action.payload.test_data);
      default:
        return state;
    }
  }
};
