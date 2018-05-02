import { login_api } from "../config";
import axios from "axios";

export const authApi = {
  async login(payload) {
    const response = await axios.post(login_api, payload);
    const result = JSON.parse(response.data);
    return result;
  }
};
