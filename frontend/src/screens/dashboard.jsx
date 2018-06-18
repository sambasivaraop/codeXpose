import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Navbar";
import { Card, CardTitle, Row, Col } from "reactstrap";
import { Icon } from "react-fa";

export default class Dashboard extends React.Component {
  render() {
    const active_dashboard = "active";
    return (
      <div>
        <Sidebar activeDashboard={active_dashboard} />
        <Topbar activeDashboard={active_dashboard} />
        <Row className="boxStyle">
          <Col sm="12">
            <Row>
              <Col sm="4">
                <Card body outline color="success" className="bg-dark">
                  <CardTitle>
                    <center>
                      <Icon size="4x" name="code" className="text-success" />
                    </center>
                  </CardTitle>
                  <Link
                    className="badge badge-pill badge-success"
                    to="/create_test/"
                  >
                    Create Test
                  </Link>
                </Card>
              </Col>
              <Col sm="4">
                <Card body outline color="danger" className="bg-dark">
                  <CardTitle>
                    <center>
                      <Icon
                        size="4x"
                        name="user-plus"
                        className="text-danger"
                      />
                    </center>
                  </CardTitle>
                  <Link
                    className="badge badge-pill badge-danger"
                    to="/create_user/"
                  >
                    Create User
                  </Link>
                </Card>
              </Col>
              <Col sm="4">
                <Card body outline color="warning" className="bg-dark">
                  <CardTitle>
                    <center>
                      <Icon size="4x" name="users" className="text-warning" />
                    </center>
                  </CardTitle>
                  <Link
                    className="badge badge-pill badge-warning"
                    to="/view_users/"
                  >
                    View Users
                  </Link>
                </Card>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm="4">
                <Card body outline color="info" className="bg-dark">
                  <CardTitle>
                    <center>
                      <Icon
                        size="4x"
                        name="file-code-o"
                        className="text-info"
                      />
                    </center>
                  </CardTitle>
                  <Link
                    className="badge badge-pill badge-info"
                    to="/view_tests/"
                  >
                    View Tests
                  </Link>
                </Card>
              </Col>
              <Col sm="4">
                <Card body outline color="primary" className="bg-dark">
                  <CardTitle>
                    <center>
                      <Icon
                        size="4x"
                        name="question-circle-o"
                        className="text-primary"
                      />
                    </center>
                  </CardTitle>
                  <Link
                    className="badge badge-pill badge-primary"
                    to="/view_questions/"
                  >
                    View Questions
                  </Link>
                </Card>
              </Col>
              <Col sm="4">
                <Card body outline color="secondary" className="bg-dark">
                  <CardTitle>
                    <center>
                      <Icon size="4x" name="plus" className="text-secondary" />
                    </center>
                  </CardTitle>
                  <Link
                    className="badge badge-pill badge-secondary"
                    to="/create_question/"
                  >
                    Create Question
                  </Link>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
