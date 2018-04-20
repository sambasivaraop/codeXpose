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
    console.log(error);
  }
};

// export const addQuestion = ({ question }) => async (dispatch, getState) => {
//     try {
//         const { questions } = getState();
//         const newQuestion = await questionsApi.addQuestion({ question });
//         const newQuestions = [ ...questions, newQuestion ];
//         dispatch(setQuestions({ questions: newQuestions }));
//     } catch (err) {
//         dispatch(setError(err));
//     }

// }
