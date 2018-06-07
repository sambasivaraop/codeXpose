import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
  Input
} from "reactstrap";

export class CreateTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      test_type: "",
      duration: "00:00",
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
  handleSubmit = event => {
    event.preventDefault();
    const { title, test_type, duration, question, difficulty } = this.state;
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
    return (
      <div>
        <Sidebar activeCreateTest={active_create_test} />
        <Topbar />
        <Row className="boxStyle">
          <Col md="12">
            <Card body className="border border-primary bgGrey">
              <CardTitle> Create Test </CardTitle>
              <br />
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
                        <option key={index} value={question.question_id}>
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
    pending: state.questionsPending,
    success: state.questionsSuccess,
    error: state.questionsFail,
    questions: state.allQuestions
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllQuestions, createTest }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateTest);
