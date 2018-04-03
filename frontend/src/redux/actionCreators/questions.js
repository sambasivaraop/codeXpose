import * as ques_actions from "../actions/questions";
import { questionsApi } from "../../api/questions";

export const setQuestions = questions => ({
  type: ques_actions.SET_QUESTIONS,
  payload: { questions }
});

export const changeQuestionStatus = (status, id) => ({
  type: ques_actions.CHANGE_QUESTION_STATUS,
  payload: {
    status: status,
    id: id
  }
});

export const getQuestion = test_id => async (dispatch, getState) => {
  try {
    let token = "JWT ".concat(getState().authToken);
    // let token = "JWT ".concat(
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjMwMTQzNTUsIm9yaWdfaWF0IjoxNTIzMDEwNzU1LCJ1c2VybmFtZSI6ImFydW4udmVybWFAaW1hZ2luZWEuY29tIiwidXNlcl9pZCI6NjIsImVtYWlsIjoiYXJ1bi52ZXJtYUBpbWFnaW5lYS5jb20ifQ.JoXc3ihXQpEbHMSQuRcDlS7Q_vL_F3pWL6TloC3C7KQ"
    // );
    let headers = {
      headers: { Authorization: token }
    };
    // console.log(getState());
    const questions = getState().questions; // Problem may lies here
    console.log("Questions from store :", questions);
    if (test_id) {
      //get question related to test
      var response = await questionsApi.getQuestion(headers, test_id);
    } else {
      //get all question
    }
    // const response = await questionsApi.getQuestion(headers, test_id);
    const data = response.data;
    data["isSolved"] = false;
    const newQuestions = [...questions, data];
    console.log("New Question Array :", newQuestions);
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
