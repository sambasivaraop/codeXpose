export const questionsApi = {
    addQuestion({ question }) {
        question.id = 1;
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve({...question}));
        })
    }
}