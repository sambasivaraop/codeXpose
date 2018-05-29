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

export default class CreateTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      testType: "",
      createdBy: "",
      duration: "",
      question: "",
      difficulty: "",
      enableAlert: false
    };
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
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

    // axios
    //   .post(
    //     "http://localhost:8000/interview/user/",
    //     {
    //       first_name: this.state.firstname,
    //       last_name: this.state.lastname,
    //       password: this.state.pwd,
    //       email: this.state.emailid,
    //       user_type: this.state.usertype,
    //       is_admin: this.state.isadmin
    //     },
    //     headers
    //   )
    //   .then(response => {
    //     this.setState({
    //       data: JSON.parse(response.data),
    //       enableAlert: false,
    //       message: "success"
    //     });
    //   })
    //   .catch(error => {
    //     //            console.log(headers);
    //     if (error.response.status == 400) {
    //       text = "Invalid Username or Password !";
    //     } else {
    //       text =
    //         "There is some error while processing !\
    //                     Kindly refresh the page.";
    //     }
    //     this.setState({
    //       message: text,
    //       enableAlert: true
    //     });
    //   });
  };
  render() {
    //        console.log(this.props.match.params.token);
    const active_create_test = "active";
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
        <Sidebar activeCreateTest={active_create_test} />
        <Topbar />
        <Row style={style}>
          <Col md="12">
            <Card body className="border border-primary" style={cardStyle}>
              <CardTitle> Create Test </CardTitle>
              <Form
                name="test-form"
                id="test-form"
                onSubmit={this.handleSubmit}
              >
                <FormGroup row>
                  <Label size="sm" htmlFor="title" md={2}>
                    Title*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Test title"
                      required
                      value={this.state.title}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Label size="sm" htmlFor="testType" md={2}>
                    Test Type*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="select"
                      id="testType"
                      name="testType"
                      required
                      value={this.state.testType}
                      onChange={this.handleInputChange}
                    >
                      <option value="">--- Please Select ---</option>
                      <option value="PROGRAMMING">Programming</option>
                      <option value="MCQ">MCQ</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label size="sm" htmlFor="createdBy" md={2}>
                    Created By*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="email"
                      id="createdBy"
                      name="createdBy"
                      placeholder="Created by"
                      required
                      value="test.user@xx.com"
                      disabled
                    />
                  </Col>
                  <Label size="sm" htmlFor="duration" md={2}>
                    Duration*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="time"
                      id="duration"
                      name="duration"
                      placeholder="Duration"
                      required
                      value={this.state.duration}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label size="sm" htmlFor="question" md={2}>
                    Question*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="select"
                      id="question"
                      name="question"
                      required
                      //   value={this.state.question}
                      onChange={this.handleInputChange}
                      multiple
                    >
                      <option value="binary search">Binary Search</option>
                      <option value="merge sort">Merge Sort</option>
                      <option value="fibonacci series">Fibinacci Series</option>
                    </Input>
                  </Col>
                  <Label size="sm" htmlFor="difficulty" md={2}>
                    Difficulty*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="select"
                      id="difficulty"
                      name="difficulty"
                      required
                      value={this.state.difficulty}
                      onChange={this.handleInputChange}
                    >
                      <option value="">--- Please Select ---</option>
                      <option value="EASY">Easy</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HARD">Hard</option>
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
