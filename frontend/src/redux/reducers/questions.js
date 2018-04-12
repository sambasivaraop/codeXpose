import * as questionsActions from "../actions/questions";

export const questionsReducers = {
  questions: (state = [], action) => {
    switch (action.type) {
      case questionsActions.SET_QUESTIONS:
        return action.payload.questions;
      case questionsActions.CHANGE_QUESTION_STATUS:
        return {
          state
        };
      default:
        return state;
    }
  }
};
