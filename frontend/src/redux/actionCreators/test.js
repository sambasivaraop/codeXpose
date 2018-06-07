import * as test_actions from "../actions/test";
import { testApi } from "../../api/test";
import { setQuestions } from "../actionCreators/questions";
import { push } from "react-router-redux";

export const testPending = pending => ({
  type: test_actions.TEST_PENDING,
  payload: { pending }
});

export const testCompleted = completed => ({
  type: test_actions.TEST_COMPLETED,
  payload: { completed }
});

export const testGetPending = isPending => ({
  type: test_actions.TEST_GET_PENDING,
  payload: { isPending }
});

export const testGetSuccess = test_data => ({
  type: test_actions.TEST_GET_SUCCESS,
  payload: { test_data }
});

export const testGetFail = error => ({
  type: test_actions.TEST_GET_FAIL,
  payload: { error }
});
export const testCreateSuccess = data => ({
  type: test_actions.TEST_CREATE_SUCCESS,
  payload: { data }
});
export const testCreatePending = isPending => ({
  type: test_actions.TEST_CREATE_PENDING,
  payload: { isPending }
});
export const testCreateFail = error => ({
  type: test_actions.TEST_CREATE_FAIL,
  payload: { error }
});

export const getTest = test_id => async (dispatch, getState) => {
  try {
    let token = "JWT ".concat(getState().authToken);

    let headers = {
      headers: { Authorization: token }
    };
    dispatch(testGetPending(true));

    const response = await testApi.getTest(headers, test_id);
    const data = response.data;

    // Get questions associated with test and save in store
    dispatch(setQuestions(data.question));

    dispatch(testGetPending(false));
    dispatch(testGetSuccess(data));
    dispatch(push("/test"));
  } catch (error) {
    dispatch(testGetPending(false));
    dispatch(testGetFail(error));
  }
};

export const createTest = ({
  title,
  test_type,
  duration,
  question,
  difficulty
}) => async (dispatch, getState) => {
  try {
    let token = "JWT ".concat(getState().authToken);
    let headers = {
      headers: { Authorization: token }
    };
    let payload = {
      title,
      test_type,
      duration,
      question,
      difficulty
    };
    dispatch(testCreatePending(true));
    const data = await testApi.createTest(payload, headers);
    dispatch(testCreatePending(false));
    dispatch(testCreateSuccess(data));
  } catch (error) {
    dispatch(testCreatePending(false));
    dispatch(testCreateFail(error));
  }
};
