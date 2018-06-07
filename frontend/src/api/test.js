import { test_get_api } from "../config";
import axios from "axios";

export const testApi = {
  getTest(headers, test_id) {
    return axios.get(test_get_api + test_id + "/", headers);
  },
  async createTest(payload, headers) {
    const response = await axios.post(test_get_api, payload, headers);
    return response.data;
  }
};
