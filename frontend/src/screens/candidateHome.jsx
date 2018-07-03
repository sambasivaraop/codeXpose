import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopbarCandidate from "../components/Navbar_candidate";
import { Card, CardTitle, Row, Col } from "reactstrap";
import { Icon } from "react-fa";

export default class CandidateHome extends React.Component {
  render() {
    const active_dashboard = "active";
    return (
      <div>
        {localStorage.getItem("user_type") === "CANDIDATE" ? (
          <div>
            <Sidebar activeDashboard={active_dashboard.concat(" bg-info")} />
            <TopbarCandidate activeDashboard={active_dashboard} />
            <Row className="boxStyle">
              <Col sm="12">
                <Row>
                  <Col sm="4">
                    <Card body outline color="success" className="bg-dark">
                      <CardTitle>
                        <center>
                          <Icon
                            size="4x"
                            name="clock-o"
                            className="text-success"
                          />
                        </center>
                      </CardTitle>
                      <Link
                        className="badge badge-pill badge-success"
                        to="/guidelines/"
                      >
                        Start Test
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
                      <Link className="badge badge-pill badge-danger" to="/#/">
                        My Profile
                      </Link>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        ) : (
          <div>
            <h4>Sorry! You are not authorized. </h4>
          </div>
        )}
      </div>
    );
  }
}
