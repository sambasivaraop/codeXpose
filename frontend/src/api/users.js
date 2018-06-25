import { create_user_api } from "../config";
import axios from "axios";

export const userApi = {
  async createUser(payload, headers) {
    const response = await axios.post(create_user_api, payload, headers);
    return response.data;
  },
  async getAllUsers(headers) {
    const response = await axios.get(create_user_api, headers);
    return response.data;
  },
  async getSingleUser(headers, user_id) {
    const response = await axios.get(create_user_api + user_id + "/", headers);
    return response.data;
  }
};
