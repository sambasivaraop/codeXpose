import React, { Component } from "react";
import { AuthRoutesOutlet } from "./layouts/AuthRoutesOutlet";
import { AppRoutesOutlet } from "./layouts/AppRoutesOutlet";
import { Container, Row, Col } from "reactstrap";

class App extends Component {
  render() {
    const style = {};
    return (
      <div style={style}>
        <Container>
          <Row>
            <Col sm="12" md="12">
              {localStorage.getItem("token") ? <AppRoutesOutlet /> : ""}
              <AuthRoutesOutlet />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
