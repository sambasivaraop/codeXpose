import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getTest } from "../redux/actionCreators/test";

import { Card, CardTitle, Button, FormGroup } from "reactstrap";

var style = {
  marginTop: "10%",
  marginLeft: "15%",
  width: "85%",
  backgroundColor: "rgba(255,255,255,.4)"
};

export class TestGuideline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAccept: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.getTest(1);
  };

  handleInputChange = event => {
    this.setState({
      isAccept: !this.state.isAccept
    });
  };

  render() {
    return (
      <Card body style={style}>
        <CardTitle tag="h2" className="text-center">
          Test Guidelines
        </CardTitle>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ol>
              <li>This test conains programming qurstions.</li>
              <li>
                Please read the problem statement before starting the code.
              </li>
              <li>
                You are excepted to attempt all the question based on best of
                your knowledge.
              </li>
              <li>
                You are excepted not to copy the code from any other source.
              </li>
              <li>
                After starting, you can not leave the test in between or test
                will be marked as completed.
              </li>
            </ol>
          </FormGroup>
          <FormGroup>
            <input
              type="checkbox"
              checked={this.state.isAccept}
              onChange={this.handleInputChange}
            />
            I understand and agree to the above.
          </FormGroup>
          <center>
            <Button disabled={!this.state.isAccept} color="primary">
              Start Test
            </Button>
          </center>
        </form>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    completed: state.isCompleted,
    getPending: state.testGetPending,
    getFail: state.testGetFail,
    data: state.testData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTest
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TestGuideline);
