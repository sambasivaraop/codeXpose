import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { Card, Button } from "reactstrap";

export class test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToQuestion: false,
      question_id: null
    };
  }

  handleTestSubmit = event => {};

  render() {
    var style = {
      marginTop: "10%",
      marginLeft: "15%",
      width: "85%",
      backgroundColor: "rgba(255,255,255,.4)"
    };

    let question = [];
    for (var i = 0; i < this.props.questions.length; i++) {
      question.push(
        <div className="row">
          <div className="col-8">
            <ol>
              <li>{this.props.questions[i].title} </li>
            </ol>
          </div>
          <div className="col-4">
            <center>
              <Link to={"/question/" + this.props.questions[i].id}>
                <Button id={this.props.questions[i].id} type="submit">
                  Solve
                </Button>
              </Link>
            </center>
          </div>
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
