import * as ques_actions from "../actions/questions";
import { questionsApi } from "../../api/questions";

export const setQuestions = questions => ({
  type: ques_actions.SET_QUESTIONS,
  payload: { questions }
});

export const changeQuestionStatus = (status, id) => ({
  type: ques_actions.CHANGE_QUESTION_STATUS,
  payload: {
    status,
    id
  }
});
export const get_ques_pending = isPending => ({
  type: ques_actions.GET_QUESTION_PENDING,
  payload: { isPending }
});
export const get_ques_success = data => ({
  type: ques_actions.GET_QUESTION_SUCCESS,
  payload: { data }
});
export const get_ques_fail = error => ({
  type: ques_actions.GET_QUESTION_FAIL,
  payload: { error }
});
export const add_ques_pending = isPending => ({
  type: ques_actions.ADD_QUESTION_PENDING,
  payload: { isPending }
});
export const add_ques_success = data => ({
  type: ques_actions.ADD_QUESTION_SUCCESS,
  payload: { data }
});
export const add_ques_fail = error => ({
  type: ques_actions.ADD_QUESTION_FAIL,
  payload: { error }
});

export const getQuestion = test_id => async (dispatch, getState) => {
  try {
    let token = "JWT ".concat(getState().authToken);
    let headers = {
      headers: { Authorization: token }
    };
    const questions = getState().questions;
    if (test_id) {
      var response = await questionsApi.getQuestion(headers, test_id);
    } else {
      //get all question
    }
    const data = response.data;
    data["isSolved"] = false;
    const newQuestions = [...questions, data];
    dispatch(setQuestions(newQuestions));
  } catch (error) {
    // dispatch(question_get_fail(error));
  }
};
export const getAllQuestions = () => async (dispatch, getState) => {
  try {
    let token = "JWT ".concat(getState().authToken);
    let headers = {
      headers: { Authorization: token }
    };
    dispatch(get_ques_pending(true));
    const data = await questionsApi.getAllQuestions(headers);
    dispatch(get_ques_pending(false));
    dispatch(get_ques_success(data));
  } catch (error) {
    dispatch(get_ques_pending(false));
    dispatch(get_ques_fail(error));
  }
};
export const addQuestion = formData => async (dispatch, getState) => {
  try {
    let token = "JWT ".concat(getState().authToken);
    let headers = {
      headers: {
        Authorization: token,
        "content-type": "multipart/form-data"
      }
    };
    dispatch(add_ques_pending(true));
    const data = await questionsApi.addQuestion(formData, headers);
    dispatch(add_ques_pending(false));
    dispatch(add_ques_success(data));
  } catch (error) {
    dispatch(add_ques_pending(false));
    dispatch(add_ques_fail(error));
  }
};
