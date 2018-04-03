import { test_get_api } from "../config";
import axios from "axios";

export const testApi = {
  getTest(headers, test_id) {
    return axios.get(test_get_api + test_id + "/", headers);
  }
};
