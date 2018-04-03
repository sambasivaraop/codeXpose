import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  Card,
  CardTitle,
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

export class test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToQuestion: false,
      question_id: null
    };
  }

  handleSubmit = event => {};

  handleQuestionStatusButton = event => {
    event.preventDefault();
    console.log("Button ID is :", event.target.id);
    this.setState({
      redirectToQuestion: true,
      question_id: event.target.id
    });
  };

  handleTestSubmit = event => {};

  // handleQuestionSubmit = event => {
  //   //Save the code
  //   // dispatch();
  //   console.log("In submit");
  //   this.setState({
  //     openModal: !this.state.openModal
  //   });
  // };

  handleQuestionRun = event => {};

  handleInputChange = event => {};

  render() {
    var style = {
      marginTop: "10%",
      marginLeft: "15%",
      width: "85%",
      backgroundColor: "rgba(255,255,255,.4)"
    };

    if (this.state.redirectToQuestion) {
      return <Redirect to={"/question/" + this.state.question_id} />;
    }

    let question = [];
    // console.log(this.props.questions.length);
    for (var i = 0; i < this.props.questions.length; i++) {
      console.log("Question ID is :", this.props.questions[i].ques_id);
      question.push(
        <div className="row">
          <div className="col-8">
            <ol>
              <li> {this.props.questions[i].title} </li>
            </ol>
          </div>
          <div className="col-4">
            <center>
              {this.props.questions[i].isSolved ? (
                <Button
                  id={this.props.questions[i].ques_id}
                  type="submit"
                  onClick={this.handleQuestionStatusButton}
                >
                  Solved
                </Button>
              ) : (
                <Button
                  id={this.props.questions[i].ques_id}
                  type="submit"
                  onClick={this.handleQuestionStatusButton}
                >
                  Unsolved
                </Button>
              )}
            </center>
          </div>
          {/* <h2> I am inside Candidate Test Page! </h2> */}
        </div>
      );
    }
    return (
      <Card body style={style}>
        {question}
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    completed: state.isCompleted,
    getPending: state.testGetPending,
    getFail: state.testGetFail,
    testData: state.testData,
    questions: state.questions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(test);
