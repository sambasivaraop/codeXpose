import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAlltests } from "../redux/actionCreators/test";
import Topbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { Row, Col, Card, CardTitle, Table } from "reactstrap";

export class ViewTests extends Component {
  constructor(props) {
    super(props);
    this.props.getAlltests();
  }
  render() {
    var active_view_test_class = "active";
    return (
      <div>
        <Topbar activeViewTest={active_view_test_class} />
        <Sidebar activeViewTest={active_view_test_class} />
        <Row className="boxStyle">
          <Col md="12">
            <Card body className="border border-primary bgGrey">
              <CardTitle> View Tests </CardTitle>
              <br />
              <Table bordered striped className="bg-light" size="sm">
                <thead>
                  <tr>
                    <th>Test Id</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Duration</th>
                    <th>Difficulty</th>
                    <th>Interviewer Id</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.tests.map((tests, index) => (
                    <tr key={index}>
                      <td> {tests.id} </td>
                      <td> {tests.title} </td>
                      <td> {tests.test_type} </td>
                      <td>{tests.duration}</td>
                      <td>{tests.difficulty}</td>
                      <td>{tests.created_by}</td>
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
    tests: state.allTests
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getAlltests
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewTests);
