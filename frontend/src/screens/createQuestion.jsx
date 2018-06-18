import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Topbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { addQuestion } from "../redux/actionCreators/questions";
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

var form_data = new FormData();
export class CreateQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question_id: "",
      title: "",
      question_type: "",
      marks: "",
      difficulty: "",
      skeleton: null,
      test_cases: null,
      problem_statement: null
    };
  }
  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "file" ? target.files[0] : target.value;
    this.setState({
      [name]: value
    });
    this.formData(name, value);
  };
  handleSubmit = event => {
    event.preventDefault();

    this.props.addQuestion(form_data);
  };
  formData = (name, value) => {
    form_data.append(name, value);
  };
  render() {
    const active_create_ques = "active";
    return (
      <div>
        <Sidebar activeCreateQues={active_create_ques} />
        <Topbar />
        <Row className="boxStyle">
          <Col md="12">
            <Card body className="border border-primary bgGrey">
              <CardTitle> Create Question </CardTitle>
              <br />
              <Form
                name="ques-form"
                id="ques-form"
                onSubmit={this.handleSubmit}
              >
                <FormGroup row>
                  <Label size="sm" htmlFor="question_id" md={2}>
                    Question Id*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="question_id"
                      name="question_id"
                      placeholder="Question Id"
                      required
                      value={this.state.question_id}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Label size="sm" htmlFor="title" md={2}>
                    Title*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title"
                      required
                      value={this.state.title}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label size="sm" htmlFor="question_type" md={2}>
                    Question Type*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="question_type"
                      name="question_type"
                      placeholder="Question Type"
                      required
                      value={this.state.question_type}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Label size="sm" htmlFor="problem_statement" md={2}>
                    Problem Statement*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="file"
                      id="problem_statement"
                      name="problem_statement"
                      required
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label size="sm" htmlFor="test_cases" md={2}>
                    Test Cases*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="file"
                      id="test_cases"
                      name="test_cases"
                      required
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Label size="sm" htmlFor="skeleton" md={2}>
                    Skeleton*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="file"
                      id="skeleton"
                      name="skeleton"
                      required
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label size="sm" htmlFor="marks" md={2}>
                    Marks*
                  </Label>
                  <Col md={4}>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="marks"
                      name="marks"
                      placeholder="Marks"
                      required
                      value={this.state.marks}
                      onChange={this.handleInputChange}
                    />
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
function mapStateToProps(state) {
  return {
    pending: state.questionsPending,
    success: state.questionsSuccess,
    error: state.questionsFail
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addQuestion }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateQuestion);
