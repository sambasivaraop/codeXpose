import * as test_actions from "../actions/test";
import { testApi } from "../../api/test";
import { getQuestion } from "../actionCreators/questions";

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
    console.log(getState());
    let token = "JWT ".concat(getState().authToken);
    // let token = "JWT ".concat(
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjMwMTQzNTUsIm9yaWdfaWF0IjoxNTIzMDEwNzU1LCJ1c2VybmFtZSI6ImFydW4udmVybWFAaW1hZ2luZWEuY29tIiwidXNlcl9pZCI6NjIsImVtYWlsIjoiYXJ1bi52ZXJtYUBpbWFnaW5lYS5jb20ifQ.JoXc3ihXQpEbHMSQuRcDlS7Q_vL_F3pWL6TloC3C7KQ"
    // );

    let headers = {
      // id: test_id,
      headers: { Authorization: token }
    };
    // dispatch(test_pending(true));
    dispatch(test_get_pending(true));

    const response = await testApi.getTest(headers, test_id);
    // const data = JSON.parse(response.data);
    const data = response.data;

    // TODO: get questions associated with test and save in store
    for (let i = 0; i < data.question.length; i++) {
      console.log("CALLING getQuestion for ID", data.question[i].id);
      dispatch(getQuestion(data.question[i].id));
    }

    dispatch(test_get_pending(false));
    dispatch(test_get_success(data));
  } catch (error) {
    dispatch(test_get_pending(false));
    dispatch(test_get_fail(error));
  }
};
