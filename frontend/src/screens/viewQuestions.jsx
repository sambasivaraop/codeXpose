import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllQuestions } from "../redux/actionCreators/questions";
import Topbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { Row, Col, Card, CardTitle, Table } from "reactstrap";

export class ViewQuestions extends Component {
  constructor(props) {
    super(props);
    this.props.getAllQuestions();
  }
  render() {
    var active_view_ques_class = "active";
    return (
      <div>
        <Topbar activeViewQues={active_view_ques_class} />
        <Sidebar activeViewQues={active_view_ques_class.concat(" bg-info")} />
        <Row className="boxStyle">
          <Col md="12">
            <Card body className="border border-primary bgGrey">
              <CardTitle> View Questions </CardTitle>
              <br />
              <Table bordered striped className="bg-light" size="sm">
                <thead>
                  <tr>
                    <th>Question Id</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Marks</th>
                    <th>Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.questions.map((questions, index) => (
                    <tr key={index}>
                      <td> {questions.question_id} </td>
                      <td> {questions.title} </td>
                      <td> {questions.question_type} </td>
                      <td>{questions.marks}</td>
                      <td>{questions.difficulty}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    questions: state.allQuestions
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getAllQuestions
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewQuestions);
