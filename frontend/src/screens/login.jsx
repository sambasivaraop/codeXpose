import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../redux/actionCreators/auth";
import {
  Card,
  CardTitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert
} from "reactstrap";
import user2 from "../img/user2.png";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false
    };
  }
  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.login({ username, password });
  };
  render() {
    var errorAlert = "";
    if (this.props.error) {
      errorAlert = (
        <Alert color="danger"> {this.props.error.response.data} </Alert>
      );
    }
    return (
      <Card body className="loginBox">
        <img
          className="mx-auto d-block"
          src={user2}
          alt="user-img"
          width="130"
          height="130"
        />
        <CardTitle tag="h2" className="text-center">
          Sign In
        </CardTitle>
        {errorAlert}
        <Form name="login-form" id="login-form" onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="username">Email</Label>
            <Input
              type="email"
              id="username"
              placeholder="Email"
              name="username"
              className="border border-primary"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
            <FormText color="black">eg: sample@abc.com</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              className="border border-primary"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <Button color="primary">Sign In</Button>
        </Form>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    pending: state.authPending,
    token: state.authToken,
    error: state.authError
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      login
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
