import { loginReducers } from "../redux/reducers/auth";
import * as action_type from "../redux/actions/auth";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(loginReducers.authPending(undefined, {})).toEqual(null);
    expect(loginReducers.authToken(undefined, {})).toEqual("");
    expect(loginReducers.authError(undefined, {})).toEqual("");
  });
  it("should set the auth pending state", () => {
    const initialState = null;
    const action = {
      type: action_type.LOGIN_PENDING,
      payload: { isPending: true }
    };
    expect(loginReducers.authPending(initialState, action)).toEqual(true);
  });
  it("should set the auth token state", () => {
    const initialState = "";
    const action = {
      type: action_type.LOGIN_SUCCESS,
      payload: { token: "abc" }
    };
    expect(loginReducers.authToken(initialState, action)).toEqual("abc");
  });
  it("should set auth error state", () => {
    const initialState = "";
    const action = {
      type: action_type.LOGIN_FAIL,
      payload: { error: "Syntax Error: Unexpected Token" }
    };
    expect(loginReducers.authError(initialState, action)).toEqual(
      "Syntax Error: Unexpected Token"
    );
  });
});
