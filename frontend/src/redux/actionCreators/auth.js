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
export const logoutPending = isPending => ({
  type: auth.LOGOUT_PENDING,
  payload: { isPending }
});
export const logoutSuccess = data => ({
  type: auth.LOGOUT_SUCCESS,
  payload: { data }
});
export const logoutFail = error => ({
  type: auth.LOGOUT_FAIL,
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
    localStorage.setItem("token", data.token);
    dispatch(push("/dashboard"));
  } catch (error) {
    dispatch(login_pending(false));
    dispatch(login_fail(error));
  }
};
export const logout = () => async (dispatch, getState) => {
  try {
    dispatch(logoutPending(true));
    localStorage.removeItem("token");
    dispatch(push("/login"));
    dispatch(logoutPending(false));
    dispatch(logoutSuccess(true));
  } catch (error) {
    dispatch(logoutPending(false));
    dispatch(logoutFail(error));
  }
};
