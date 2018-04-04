import React, { Component } from "react";
import { AuthRoutesOutlet } from "./layouts/AuthRoutesOutlet";
import { Container, Row, Col } from "reactstrap";

class App extends Component {
  render() {
    const style = {};
    return (
      <div style={style}>
        <Container>
          <Row>
            <Col sm="12" md="12">
              <AuthRoutesOutlet />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
