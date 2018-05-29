import React, { Component } from "react";
import {
  Card,
  CardTitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

export class CodeEditor extends Component {
  handleInputChange = event => {
    event.preventDefault();
    window.runit();
  };
  render() {
    var style = {
      marginTop: "7%",
      marginLeft: "15%",
      width: "85%",
      backgroundColor: "rgba(255,255,255,.4)"
    };

    return (
      <Card body style={style}>
        <CardTitle tag="h2" className="text-center">
          Code Editor For Python
        </CardTitle>
        <Form name="code-editor" id="code-editor">
          <FormGroup>
            <textarea
              id="my-code"
              cols="98"
              rows="10"
              defaultValue="#sample goes here"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          {/* <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              className="border border-primary"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </FormGroup> */}
          {/* <Button color="primary" onClick={this.handleInputChange}>
            Run It
          </Button> */}
        </Form>
        <pre id="output" />
      </Card>
    );
  }
}
