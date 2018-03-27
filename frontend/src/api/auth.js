import { login_api } from "../config";
import axios from "axios";

export const authApi = {
  login(payload) {
    return axios.post(login_api, payload);
  }
};
