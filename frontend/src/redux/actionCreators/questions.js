import * as actions from '../actions/questions';
import { questionsApi } from '../../api/questions';

export const addQuestion = ({ question }) => async (dispatch, getState) => {
    try {
        const { questions } = getState();
        const newQuestion = await questionsApi.addQuestion({ question });
        const newQuestions = [ ...questions, newQuestion ];
        dispatch(setQuestions({ questions: newQuestions }));
    } catch (err) {
        dispatch(setError(err));
    }


}

export const setQuestions = ({ questions }) => ({
    type: actions.SET_QUESTIONS,
    payload: { questions }
});
