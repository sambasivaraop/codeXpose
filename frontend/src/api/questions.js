import { question_get_api } from "../config";
import axios from "axios";

export const questionsApi = {
  getQuestion(headers, ques_id) {
    return axios.get(question_get_api + ques_id + "/", headers);
  },
  async getAllQuestions(headers) {
    const response = await axios.get(question_get_api, headers);
    return response.data;
  },
  async addQuestion(payload, headers) {
    const response = await axios.post(question_get_api, payload, headers);
    return response.data;
  }
};
