import * as questionsActions from "../actions/questions";
import { stat } from "fs";

export const questionsReducers = {
  questionsPending: (state = null, action) => {
    switch (action.type) {
      case questionsActions.GET_QUESTION_PENDING:
        return action.payload.isPending;
      default:
        return state;
    }
  },
  questionsSuccess: (state = null, action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
  questionsFail: (state = null, action) => {
    switch (action.type) {
      case questionsActions.GET_QUESTION_FAIL:
        return action.payload.error;
      default:
        return state;
    }
  },
  allQuestions: (state = [], action) => {
    switch (action.type) {
      case questionsActions.GET_QUESTION_SUCCESS:
        return action.payload.data;
      default:
        return state;
    }
  },
  testQuestions: (state = [], action) => {
    switch (action.type) {
      case questionsActions.SET_QUESTIONS:
        return action.payload.questions;
      case questionsActions.CHANGE_QUESTION_STATUS:
        return state;
      default:
        return state;
    }
  }
};
