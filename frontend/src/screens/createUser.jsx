import React from "react";
import Topbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

export default class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      emailid: "",
      pwd: "",
      usertype: "",
      isadmin: false,
      enableAlert: false
    };
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    let text = null;
    var headers = {
      headers: {
        Authorization: "JWT " + this.props.match.params.token
      }
    };

    axios
      .post(
        "http://localhost:8000/interview/user/",
        {
          first_name: this.state.firstname,
          last_name: this.state.lastname,
          password: this.state.pwd,
          email: this.state.emailid,
          user_type: this.state.usertype,
          is_admin: this.state.isadmin
        },
        headers
      )
      .then(response => {
        this.setState({
          data: JSON.parse(response.data),
          enableAlert: false,
          message: "success"
        });
      })
      .catch(error => {
        //            console.log(headers);
        if (error.response.status == 400) {
          text = "Invalid Username or Password !";
        } else {
          text =
            "There is some error while processing !\
                        Kindly refresh the page.";
        }
        this.setState({
          message: text,
          enableAlert: true
        });
      });
  };
  render() {
    //        console.log(this.props.match.params.token);
    const active_create_usr = "active";
    const style = {
      marginTop: "7%",
      marginLeft: "15%",
      width: "85%"
    };
    const cardStyle = {
      background: "linear-gradient(to top right, #e7e6e3 0%, #eceae1 100%)"
    };
    return (
      <div>
        <Sidebar activeCreateUser={active_create_usr} />
        <Topbar />
        <Row style={style}>
          <Col md="12">
            <Card body className="border border-primary" style={cardStyle}>
              <CardTitle> Create User </CardTitle>
              <Form
                name="user-form"
                id="user-form"
                onSubmit={this.handleSubmit}
              >
                <FormGroup row>
                  <Label size="sm" htmlFor="firstname" md={2}>
                    First Name*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="firstname"
                      name="firstname"
                      placeholder="First Name"
                      required
                      value={this.state.firstname}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Label size="sm" htmlFor="lastname" md={2}>
                    Last Name*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="lastname"
                      name="lastname"
                      placeholder="Last Name"
                      required
                      value={this.state.lastname}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label size="sm" htmlFor="emailid" md={2}>
                    Email ID*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="email"
                      id="emailid"
                      name="emailid"
                      placeholder="Email ID"
                      required
                      value={this.state.emailid}
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
                      id="pwd"
                      name="pwd"
                      placeholder="Password"
                      required
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label size="sm" htmlFor="usertype" md={2}>
                    User Type*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="select"
                      id="usertype"
                      name="usertype"
                      required
                      value={this.state.usertype}
                      onChange={this.handleInputChange}
                    >
                      <option value="">--- Please Select ---</option>
                      <option value="INTERVIEWER">Interviewer</option>
                      <option value="CANDIDATE">Candidate</option>
                    </Input>
                  </Col>
                  <Label size="sm" htmlFor="isadmin" md={2}>
                    IsAdmin*
                  </Label>
                  <Col md={2} className="pt-2 ml-3">
                    <Input
                      type="checkbox"
                      id="isadmin"
                      name="isadmin"
                      checked={this.state.isadmin}
                      onChange={this.handleInputChange}
                    />
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
