import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Col,
  Input
} from "reactstrap";

export default class Question extends Component {
  render() {
    console.log(this.props.id);
    var style = {
      marginTop: "7%",
      marginLeft: "15%",
      width: "85%",
      backgroundColor: "rgba(255,255,255,.4)"
    };
    return (
      <Card style={style}>
        <CardTitle>Problem Statement</CardTitle>
        <CardBody>
          <Form>
            <FormGroup>
              <p> I am inside Question! </p>
            </FormGroup>
            <FormGroup row>
              <Col sm={12}>
                <textarea
                  cols="125"
                  rows="10"
                  name="text"
                  placeholder="Your solution goes here...."
                />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Button>Compile</Button> &nbsp;
              <Button>Run</Button> &nbsp;
              <Button>Submit</Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
