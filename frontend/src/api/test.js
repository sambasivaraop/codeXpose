import { test_get_api, schedule_test_api, compile_api } from "../config";
import axios from "axios";

export const testApi = {
  getTest(headers, test_id) {
    return axios.get(test_get_api + test_id, headers);
  },
  async createTest(payload, headers) {
    const response = await axios.post(test_get_api, payload, headers);
    return response.data;
  },
  async getAllTests(headers) {
    const response = await axios.get(test_get_api, headers);
    return response.data;
  },
  async scheduleTest(payload, headers) {
    const response = await axios.post(schedule_test_api, payload, headers);
    return response.data;
  },
  async compileCode(payload, headers) {
    const response = await axios.post(compile_api, payload, headers);
    return response.data;
  }
};
