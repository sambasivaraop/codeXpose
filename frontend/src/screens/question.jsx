import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compileCode, compileSuccess } from "../redux/actionCreators/test";
import TopbarCandidate from "../components/Navbar_candidate";
import Sidebar from "../components/Sidebar";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Col,
  Alert
} from "reactstrap";

var question = "";
var questionId = "";

export class Question extends Component {
  constructor(props) {
    super(props);
    questionId = this.props.location.pathname.split("/")[2];
    question = this.props.questions.find(question => question.id == questionId);
    this.state = {
      text: question.skeleton
    };
    this.props.compileSuccess(null);
    const docelem = document.documentElement;
    if (docelem.requestFullscreen) {
      docelem.requestFullscreen();
    } else if (docelem.mozRequestFullScreen) {
      docelem.mozRequestFullScreen();
    } else if (docelem.webkitRequestFullscreen) {
      docelem.webkitRequestFullscreen();
    } else if (docelem.msRequestFullscreen) {
      docelem.msRequestFullscreen();
    }
  }
  handleInputChange = event => {
    event.preventDefault();
    this.setState({
      text: event.target.value
    });
    window.runit();
  };
  handleClick = () => {
    const code = this.state.text;
    this.props.compileCode(code);
  };
  render() {
    var alertDiv = "";
    if (this.props.output) {
      alertDiv = <Alert color="success">Output: {this.props.output}</Alert>;
    }
    return (
      <div className="row">
        <TopbarCandidate />
        <Sidebar />
        <Card outline color="info" className="boxStyle bgGrey">
          <CardTitle> {question.title} </CardTitle>
          <CardBody>
            {alertDiv}
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
                    value={this.state.text}
                    onChange={this.handleInputChange}
                    // defaultValue={question.skeleton}
                  />
                </Col>
              </FormGroup>
              <FormGroup check row>
                <Button color="info" onClick={this.handleClick}>
                  Compile/Run
                </Button>
                &nbsp;
                <Button color="info">Submit</Button>
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
    questions: state.testQuestions,
    output: state.testSuccess
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ compileCode, compileSuccess }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);
