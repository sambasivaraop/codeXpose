import * as test_actions from "../actions/test";
import { testApi } from "../../api/test";
import { getQuestion } from "../actionCreators/questions";
import { setQuestions } from "../actionCreators/questions";
import { push } from "react-router-redux";
export const test_pending = pending => ({
  type: test_actions.TEST_PENDING,
  payload: { pending }
});

export const test_completed = completed => ({
  type: test_actions.TEST_COMPLETED,
  payload: { completed }
});

export const test_get_pending = isPending => ({
  type: test_actions.TEST_GET_PENDING,
  payload: { isPending }
});

export const test_get_success = test_data => ({
  type: test_actions.TEST_GET_SUCCESS,
  payload: { test_data }
});

export const test_get_fail = error => ({
  type: test_actions.TEST_GET_FAIL,
  payload: { error }
});

export const getTest = test_id => async (dispatch, getState) => {
  try {
    let token = "JWT ".concat(getState().authToken);

    let headers = {
      headers: { Authorization: token }
    };
    // dispatch(test_pending(true));
    dispatch(test_get_pending(true));

    const response = await testApi.getTest(headers, test_id);
    const data = response.data;
    console.log(data);

    // Get questions associated with test and save in store
    dispatch(setQuestions(data.question));

    dispatch(test_get_pending(false));
    dispatch(test_get_success(data));
    dispatch(push("/test"));
  } catch (error) {
    dispatch(test_get_pending(false));
    dispatch(test_get_fail(error));
  }
};
