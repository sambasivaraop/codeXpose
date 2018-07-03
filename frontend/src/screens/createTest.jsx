import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Datetime from "react-datetime";
import moment from "moment";
import Topbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getAllQuestions } from "../redux/actionCreators/questions";
import { createTest } from "../redux/actionCreators/test";
import {
  Card,
  Button,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";

export class CreateTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      test_type: "",
      duration: new Date("00:00:00").getTime(),
      question: [],
      difficulty: ""
    };
    this.props.getAllQuestions();
  }
  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    var options = target.options;
    if (name === "question") {
      var value = [];
      for (var i = 0; i < options.length; i++) {
        if (options[i].selected) {
          value.push(parseInt(options[i].value));
        }
      }
    } else {
      var value = target.value;
    }
    this.setState({
      [name]: value
    });
  };
  handleDate = time => {
    this.setState({ duration: time });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { title, test_type, question, difficulty } = this.state;
    const duration = moment(this.state.duration).format("hh:mm:ss");
    this.props.createTest({
      title,
      test_type,
      duration,
      question,
      difficulty
    });
  };
  render() {
    const active_create_test = "active";
    var alertDiv = "";
    if (this.props.success) {
      alertDiv = (
        <Alert color="success">Test has been successfully created.</Alert>
      );
    }
    if (this.props.error) {
      alertDiv = <Alert color="danger">{this.props.error.response.data}</Alert>;
    }
    return (
      <div>
        {localStorage.getItem("user_type") === "INTERVIEWER" ? (
          <div>
            <Sidebar activeCreateTest={active_create_test.concat(" bg-info")} />
            <Topbar />
            <Row className="boxStyle">
              <Col md="12">
                <Card body outline color="info" className="bgGrey">
                  <CardTitle> Create Test </CardTitle>
                  <br />
                  {alertDiv}
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
                      <Label size="sm" htmlFor="test_type" md={2}>
                        Test Type*
                      </Label>
                      <Col md={4}>
                        <Input
                          bsSize="sm"
                          type="select"
                          id="test_type"
                          name="test_type"
                          required
                          value={this.state.test_type}
                          onChange={this.handleInputChange}
                        >
                          <option value="">--- Please Select ---</option>
                          <option value="PROGRAMMING">Programming</option>
                          <option value="MCQ">MCQ</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label size="sm" htmlFor="duration" md={2}>
                        Duration*
                      </Label>
                      <Col md={4}>
                        <Datetime
                          defaultValue={this.state.duration}
                          value={this.state.duration}
                          dateFormat={false}
                          timeFormat="HH:mm:ss"
                          onChange={this.handleDate}
                          className="text-info"
                          inputProps={{
                            name: "duration",
                            className: "form-control form-control-sm",
                            required: "true"
                          }}
                        />
                      </Col>
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
                          onChange={this.handleInputChange}
                          multiple
                        >
                          {this.props.questions.map((question, index) => (
                            <option key={index} value={question.id}>
                              {question.title}
                            </option>
                          ))}
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
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
                          <Button size="sm" type="submit" outline color="info">
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
        ) : (
          <div>
            <h4>Sorry! You are not authorized.</h4>
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    pending: state.questionsPending,
    success: state.questionsSuccess,
    error: state.questionsFail,
    questions: state.allQuestions
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllQuestions, createTest }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTest);
