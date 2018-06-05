import { create_user_api } from "../config";
import axios from "axios";

export const userApi = {
  async createUser(payload, headers) {
    const response = await axios.post(create_user_api, payload, headers);
    return response.data;
  }
};
