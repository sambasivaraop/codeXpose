import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Topbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { Card, Button } from "reactstrap";

export class Test extends Component {
  handleTestSubmit = event => {};

  render() {
    var active_test_class = "active";
    return (
      <div>
        <Topbar activeTest={active_test_class} />
        <Sidebar />
        <Card body className="boxStyle">
          {this.props.questions.map((question, index) => (
            <div key={index} className="row">
              <div className="col-8">
                <ol>
                  <li>{question.title} </li>
                </ol>
              </div>
              <div className="col-4">
                <center>
                  <Link to={"/question/" + question.id}>
                    <Button id={question.id} type="submit">
                      Solve
                    </Button>
                  </Link>
                </center>
              </div>
            </div>
          ))}
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    completed: state.isCompleted,
    getPending: state.testGetPending,
    getFail: state.testGetFail,
    testData: state.testData,
    questions: state.testQuestions
  };
}

export default connect(mapStateToProps)(Test);
