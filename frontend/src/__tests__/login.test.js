import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Login } from "../screens/login";
import user2 from "../img/user2.png";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    login: jest.fn()
  };
  const enzymeWrapper = mount(<Login {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe("Login", () => {
  it("should render image", () => {
    const { enzymeWrapper } = setup();
    const imgProps = enzymeWrapper.find("img").props();
    expect(enzymeWrapper.find("img").hasClass("mx-auto d-block")).toBe(true);
    expect(imgProps.src).toBe(user2);
    expect(imgProps.width).toBe("130");
    expect(imgProps.height).toBe("130");
  });
  it("should render form", () => {
    const { enzymeWrapper } = setup();
    const formProps = enzymeWrapper.find("form").props();

    expect(formProps.name).toBe("login-form");
    expect(formProps.id).toBe("login-form");
  });
  it("should render email", () => {
    const { enzymeWrapper } = setup();
    const emailProps = enzymeWrapper.find("input#username").props();

    expect(emailProps.id).toBe("username");
    expect(emailProps.name).toBe("username");
    expect(emailProps.type).toBe("email");
    expect(emailProps.placeholder).toBe("Email");
    expect(emailProps.value).toBe("");
  });
  it("should respond to change event and update the state for username", () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.find("input#username").simulate("change", {
      target: { name: "username", value: "abc@xyz.com" }
    });
    expect(enzymeWrapper.state("username")).toEqual("abc@xyz.com");
  });
  it("should render password", () => {
    const { enzymeWrapper } = setup();
    const pwdProps = enzymeWrapper.find("input#password").props();
    expect(pwdProps.id).toBe("password");
    expect(pwdProps.name).toBe("password");
    expect(pwdProps.type).toBe("password");
    expect(pwdProps.placeholder).toBe("Password");
    expect(pwdProps.value).toBe("");
  });
  it("should respond to change event and update the state for password", () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper
      .find("input#password")
      .simulate("change", { target: { name: "password", value: "abc123" } });
    expect(enzymeWrapper.state("password")).toEqual("abc123");
  });
  it("should call login function on form submit", () => {
    const { enzymeWrapper, props } = setup();
    enzymeWrapper
      .find("form#login-form")
      .simulate("submit", { preventDefault() {} });
    expect(props.login.mock.calls.length).toBe(1);
  });
  it("should call login function with username and password in state as arguments", () => {
    const { enzymeWrapper, props } = setup();
    enzymeWrapper.find("input#username").simulate("change", {
      target: { name: "username", value: "abc@xyz.com" }
    });
    enzymeWrapper
      .find("input#password")
      .simulate("change", { target: { name: "password", value: "abc123" } });
    enzymeWrapper
      .find("form#login-form")
      .simulate("submit", { preventDefault() {} });
    expect(props.login.mock.calls[0][0]).toEqual({
      username: "abc@xyz.com",
      password: "abc123"
    });
  });
});
