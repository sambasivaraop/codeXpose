import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Topbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { createUser } from "../redux/actionCreators/users";
import {
  Card,
  Button,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

export class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      user_type: "",
      enableAlert: false
    };
  }
  handleInputChange = event => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { first_name, last_name, password, user_type, email } = this.state;
    this.props.createUser({
      first_name,
      last_name,
      password,
      email,
      user_type
    });
  };
  render() {
    const active_create_usr = "active";
    return (
      <div>
        <Sidebar activeCreateUser={active_create_usr} />
        <Topbar activeCreateUser={active_create_usr} />
        <Row className="boxStyle">
          <Col md="12">
            <Card body className="border border-primary bgGrey">
              <CardTitle> Create User </CardTitle>
              <br />
              <Form
                name="user-form"
                id="user-form"
                onSubmit={this.handleSubmit}
              >
                <FormGroup row>
                  <Label size="sm" htmlFor="first_name" md={2}>
                    First Name*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="first_name"
                      name="first_name"
                      placeholder="First Name"
                      required
                      value={this.state.first_name}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Label size="sm" htmlFor="last_name" md={2}>
                    Last Name*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="last_name"
                      name="last_name"
                      placeholder="Last Name"
                      required
                      value={this.state.last_name}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label size="sm" htmlFor="email" md={2}>
                    Email ID*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email ID"
                      required
                      value={this.state.email}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Label size="sm" htmlFor="pwd" md={2}>
                    Password*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      required
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label size="sm" htmlFor="user_type" md={2}>
                    User Type*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="select"
                      id="user_type"
                      name="user_type"
                      required
                      value={this.state.user_type}
                      onChange={this.handleInputChange}
                    >
                      <option value="">--- Please Select ---</option>
                      <option value="INTERVIEWER">Interviewer</option>
                      <option value="CANDIDATE">Candidate</option>
                    </Input>
                  </Col>
                </FormGroup>
                <br />
                <FormGroup row>
                  <Col md={12}>
                    <center>
                      <Button size="sm" type="submit" outline color="primary">
                        Submit
                      </Button>
                    </center>
                  </Col>
                </FormGroup>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pending: state.userPending,
    success: state.userSuccess,
    error: state.userFail
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createUser
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
