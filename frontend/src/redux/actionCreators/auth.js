import * as auth from "../actions/auth";
import { authApi } from "../../api/auth";
import { push } from "react-router-redux";
export const login_pending = isPending => ({
  type: auth.LOGIN_PENDING,
  payload: { isPending }
});

export const login_success = token => ({
  type: auth.LOGIN_SUCCESS,
  payload: { token }
});

export const login_fail = error => ({
  type: auth.LOGIN_FAIL,
  payload: { error }
});

export const login = ({ username, password }) => async (dispatch, getState) => {
  try {
    let payload = {
      email: username,
      password
    };
    dispatch(login_pending(true));

    const data = await authApi.login(payload);
    dispatch(login_pending(false));
    dispatch(login_success(data.token));
    dispatch(push("/guidelines"));
  } catch (error) {
    dispatch(login_pending(false));
    dispatch(login_fail(error));
  }
};
