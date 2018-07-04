import { login_api, get_test_id_api } from "../config";
import axios from "axios";

export const authApi = {
  async login(payload) {
    const response = await axios.post(login_api, payload);
    const result = JSON.parse(response.data);
    return result;
  },
  async getTestId(headers) {
    const response = await axios.get(get_test_id_api, headers);
    return response.data[0].test;
  }
};
