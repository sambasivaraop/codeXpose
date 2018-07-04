import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TopbarCandidate from "../components/Navbar_candidate";
import Sidebar from "../components/Sidebar";

import { Card, Button } from "reactstrap";

export class Test extends Component {
  handleTestSubmit = event => {};

  render() {
    var active_test_class = "active";
    return (
      <div>
        {localStorage.getItem("user_type") === "CANDIDATE" ? (
          <div>
            <TopbarCandidate activeTest={active_test_class} />
            <Sidebar />
            <Card body outline color="info" className="boxStyle bgGrey">
              {this.props.questions.map((question, index) => (
                <div key={index} className="row">
                  <div className="col-8">
                    <h6>
                      {question.id}.&nbsp;{question.title}
                    </h6>
                  </div>
                  <div className="col-4">
                    <center>
                      <Link to={"/question/" + question.id}>
                        <Button
                          id={question.id}
                          type="submit"
                          outline
                          color="info"
                          size="sm"
                        >
                          Solve
                        </Button>
                      </Link>
                    </center>
                  </div>
                  <hr style={{ border: "0.5px dotted grey", width: "95%" }} />
                </div>
              ))}
            </Card>
          </div>
        ) : (
          <h4>Sorry! You are not authorized.</h4>
        )}
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
