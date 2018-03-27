import * as actions from '../actions/questions.js';

export const questionsReducers = {
 questions: (state = [], action) => {
    switch(action.type) {
        case actions.SET_QUESTIONS: return action.payload.questions;
        default: return state;
        }
    }
}