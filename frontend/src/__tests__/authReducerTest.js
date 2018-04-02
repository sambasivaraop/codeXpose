import { loginReducers } from "../redux/reducers/auth";
import * as action_type from "../redux/actions/auth";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(loginReducers.authPending(undefined, {})).toEqual(null);
    expect(loginReducers.authToken(undefined, {})).toEqual("");
    expect(loginReducers.authError(undefined, {})).toEqual("");
  });
  it("should set the auth pending state", () => {
    expect(
      loginReducers.authPending(null, {
        type: action_type.LOGIN_PENDING,
        payload: { isPending: true }
      })
    ).toEqual(true);
  });
  it("should set the auth token state", () => {
    expect(
      loginReducers.authToken("", {
        type: action_type.LOGIN_SUCCESS,
        payload: { token: "abc" }
      })
    ).toEqual("abc");
  });
  it("should set auth error state", () => {
    expect(
      loginReducers.authError("", {
        type: action_type.LOGIN_FAIL,
        payload: { error: "Syntax Error: Unexpected Token" }
      })
    ).toEqual("Syntax Error: Unexpected Token");
  });
});
