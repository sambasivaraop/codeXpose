// export const questionsApi = {
//     addQuestion({ question }) {
//         question.id = 1;
//         return new Promise((resolve, reject) => {
//             setTimeout(() => resolve({...question}));
//         })
//     }
// }

import { question_get_api } from "../config";
import axios from "axios";

export const questionsApi = {
  getQuestion(headers, ques_id) {
    return axios.get(question_get_api + ques_id + "/", headers);
  },
  async getAllQuestions(headers) {
    const response = await axios.get(question_get_api, headers);
    return response.data;
  }
};
