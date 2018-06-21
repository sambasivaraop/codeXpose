import React, { Component } from "react";
import { connect } from "react-redux";
import Topbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Col
} from "reactstrap";

export class Question extends Component {
  constructor(props) {
    super(props);
  }
  handleInputChange = event => {
    event.preventDefault();
    window.runit();
  };
  render() {
    let questionId = this.props.location.pathname.split("/")[2];
    let question = this.props.questions.find(
      question => question.id === questionId
    );

    return (
      <div className="row">
        <Topbar />
        <Sidebar />
        <Card className="boxStyle">
          <CardTitle> {question.title} </CardTitle>
          <CardBody>
            <Form name="code-editor" id="code-editor">
              <FormGroup>
                <p> {question.problem_statement} </p>
              </FormGroup>
              <FormGroup row>
                <Col sm={12}>
                  <textarea
                    cols="98"
                    rows="10"
                    name="text"
                    id="my-code"
                    onChange={this.handleInputChange}
                    defaultValue={question.skeleton}
                  />
                </Col>
              </FormGroup>
              <FormGroup check row>
                <Button>Compile</Button> &nbsp;
                <Button>Run</Button> &nbsp;
                <Button>Submit</Button>
              </FormGroup>
            </Form>
          </CardBody>
          <pre id="output" />
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.testQuestions
  };
}

export default connect(mapStateToProps)(Question);
