import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Datetime from "react-datetime";
import Topbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getUsers } from "../redux/actionCreators/users";
import {
  getAlltests,
  scheduleTest,
  testScheduleSuccess,
  testScheduleFail
} from "../redux/actionCreators/test";
import {
  Card,
  Button,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";

export class ScheduleTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidate: "",
      test: "",
      schedule: new Date()
    };
    this.props.testScheduleSuccess(null);
    this.props.testScheduleFail(null);
    this.props.getAlltests();
    this.props.getUsers();
  }
  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  };
  handleDate = date => {
    this.setState({ schedule: date });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { candidate, test, schedule } = this.state;
    this.props.scheduleTest({
      candidate,
      test,
      schedule
    });
  };
  render() {
    const active_schedule_test = "active";
    const candidateUser = this.props.users.filter(
      user => user.user_type === "CANDIDATE"
    );
    var alertDiv = "";
    if (this.props.success) {
      alertDiv = (
        <Alert color="success">Test has been successfully scheduled.</Alert>
      );
    }
    if (this.props.error) {
      alertDiv = <Alert color="danger">{this.props.error.response.data}</Alert>;
    }
    return (
      <div>
        {localStorage.getItem("user_type") === "INTERVIEWER" ? (
          <div>
            <Sidebar
              activeScheduleTest={active_schedule_test.concat(" bg-info")}
            />
            <Topbar />
            <Row className="boxStyle">
              <Col md="12">
                <Card body className="bgGrey" outline color="info">
                  <CardTitle> Schedule Test </CardTitle>
                  <br />
                  {alertDiv}
                  <Form
                    name="test-form"
                    id="test-form"
                    onSubmit={this.handleSubmit}
                  >
                    <FormGroup row>
                      <Label size="sm" htmlFor="candidate" md={2}>
                        Candidate*
                      </Label>
                      <Col md={4}>
                        <Input
                          bsSize="sm"
                          type="select"
                          id="candidate"
                          name="candidate"
                          required
                          value={this.state.candidate}
                          onChange={this.handleInputChange}
                        >
                          <option value="">--- Please Select ---</option>
                          {candidateUser.map((user, index) => (
                            <option key={index} value={user.id}>
                              {user.email}
                            </option>
                          ))}
                        </Input>
                      </Col>
                      <Label size="sm" htmlFor="test" md={2}>
                        Test*
                      </Label>
                      <Col md={4}>
                        <Input
                          bsSize="sm"
                          type="select"
                          id="test"
                          name="test"
                          required
                          value={this.state.test}
                          onChange={this.handleInputChange}
                        >
                          <option value="">--- Please Select ---</option>
                          {this.props.test.map((test, index) => (
                            <option key={index} value={test.id}>
                              {test.title}
                            </option>
                          ))}
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label size="sm" htmlFor="schedule" md={2}>
                        Schedule*
                      </Label>
                      <Col md={4}>
                        <Datetime
                          defaultValue={this.state.schedule}
                          value={this.state.schedule}
                          dateFormat="MMM DD, YYYY"
                          onChange={this.handleDate}
                          className="text-info"
                          inputProps={{
                            name: "schedule",
                            className: "form-control form-control-sm",
                            required: "true"
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <br />
                    <FormGroup row>
                      <Col md={12}>
                        <center>
                          <Button size="sm" type="submit" outline color="info">
                            Submit
                          </Button>
                        </center>
                      </Col>
                    </FormGroup>
                  </Form>
                </Card>
              </Col>
            </Row>
          </div>
        ) : (
          <div>
            <h4>Sorry! You are not authorized.</h4>
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    pending: state.testGetPending,
    success: state.testSuccess,
    error: state.testGetFail,
    test: state.allTests,
    users: state.userData
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getAlltests,
      scheduleTest,
      getUsers,
      testScheduleFail,
      testScheduleSuccess
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleTest);
