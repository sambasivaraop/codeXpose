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
    return (
      <Card body className="boxStyle">
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
        </Form>
        <pre id="output" />
      </Card>
    );
  }
}
