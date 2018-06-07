import * as userActions from "../actions/users";
import { userApi } from "../../api/users";
// import { push } from "react-router-redux";

export const add_user_pending = isPending => ({
  type: userActions.ADD_USER_PENDING,
  payload: { isPending }
});

export const add_user_success = data => ({
  type: userActions.ADD_USER_SUCCESS,
  payload: { data }
});

export const add_user_fail = error => ({
  type: userActions.ADD_USER_FAIL,
  payload: { error }
});
export const get_user_pending = isPending => ({
  type: userActions.GET_USER_PENDING,
  payload: { isPending }
});
export const get_user_success = data => ({
  type: userActions.GET_USER_SUCCESS,
  payload: { data }
});
export const get_user_fail = error => ({
  type: userActions.GET_USER_FAIL,
  payload: { error }
});

export const getUsers = user_id => async (dispatch, getState) => {
  try {
    let token = "JWT ".concat(getState().authToken);
    let headers = {
      headers: { Authorization: token }
    };
    dispatch(get_user_pending(true));
    if (!user_id || user_id === "") {
      var data = await userApi.getAllUsers(headers);
    } else {
      var data = await userApi.getSingleUser(headers, user_id);
    }
    dispatch(get_user_pending(false));
    dispatch(get_user_success(data));
  } catch (error) {
    dispatch(get_user_pending(false));
    dispatch(get_user_fail(error));
  }
};

export const createUser = ({
  first_name,
  last_name,
  password,
  email,
  user_type
}) => async (dispatch, getState) => {
  try {
    let token = "JWT ".concat(getState().authToken);
    let headers = {
      headers: { Authorization: token }
    };
    let payload = {
      first_name,
      last_name,
      password,
      email,
      user_type
    };
    dispatch(add_user_pending(true));

    const data = await userApi.createUser(payload, headers);
    dispatch(add_user_pending(false));
    dispatch(add_user_success(data));
    // dispatch(push("/guidelines"));
  } catch (error) {
    dispatch(add_user_pending(false));
    dispatch(add_user_fail(error));
  }
};
