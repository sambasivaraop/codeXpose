import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../redux/actionCreators/auth";
import * as action_type from "../redux/actions/auth";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { login_api } from "../config";

/***** Test Cases For Pure Functions (Synchronous Actions) *****/
/***** Test Cases For Login Actions *****/
describe("sync actions", () => {
  it("should create an action for login pending", () => {
    const isPending = false;
    const expectedAction = {
      type: action_type.LOGIN_PENDING,
      payload: { isPending }
    };
    expect(actions.login_pending(isPending)).toEqual(expectedAction);
  });
  it("should create an action for login success", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o";
    const expectedAction = {
      type: action_type.LOGIN_SUCCESS,
      payload: { token }
    };
    expect(actions.login_success(token)).toEqual(expectedAction);
  });
  it("should create an action for login fail", () => {
    const error = "HTTP 404/ Page Not Found";
    const expectedAction = {
      type: action_type.LOGIN_FAIL,
      payload: { error }
    };
    expect(actions.login_fail(error)).toEqual(expectedAction);
  });
});

/***** Test Cases for Asynchronous Actions (Using Thunk) ******/
/***** Test Case For Login ******/
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mock = new MockAdapter(axios);

describe("async login action", () => {
  afterEach(() => {
    mock.reset();
    mock.restore();
  });
  it("should create an action for login", () => {
    const payload = {
      email: "abc@xyz.com",
      password: "abcxyz"
    };
    mock
      .onPost(login_api, payload)
      .reply(200, JSON.stringify(`{ "token": "abc" }`), {
        "content-type": "application/json"
      });

    const expectedActions = [
      { type: action_type.LOGIN_PENDING, payload: { isPending: true } },
      { type: action_type.LOGIN_PENDING, payload: { isPending: false } },
      { type: action_type.LOGIN_SUCCESS, payload: { token: "abc" } }
    ];
    const store = mockStore({
      authPending: null,
      authToken: "",
      authError: ""
    });
    store.dispatch(actions.login(payload.email, payload.password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
