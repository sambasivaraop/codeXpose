import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "react-fa";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    var sidebarStyle = {
      height: "100%",
      width: "15%",
      backgroundColor: "#222222",
      position: "fixed",
      zIndex: "1",
      top: "0",
      left: "0",
      overflowX: "hidden",
      paddingTop: "20px"
    };
    var navClass = "nav-link text-light";
    var create_usr_class = navClass + " " + this.props.activeCreateUser;
    var create_test_class = navClass + " " + this.props.activeCreateTest;
    var view_usr_class = navClass + " " + this.props.activeViewUser;
    var view_test_class = navClass + " " + this.props.activeViewTest;
    var view_ques_class = navClass + " " + this.props.activeViewQues;
    var create_ques_class = navClass + " " + this.props.activeCreateQues;
    var dashboard_class = navClass + " " + this.props.activeDashboard;
    var schedule_test_class = navClass + " " + this.props.activeScheduleTest;
    return (
      <div style={sidebarStyle}>
        {localStorage.getItem("user_type") === "INTERVIEWER" ? (
          <div className="nav flex-column nav-pills mt-5">
            <Link className={dashboard_class} to="/dashboard">
              <small>
                <Icon size="lg" name="dashboard" />&nbsp;Dashboard
              </small>
            </Link>
            <Link className={create_test_class} to="/create_test/">
              <small>
                <Icon size="lg" name="code" />&nbsp;Create Test
              </small>
            </Link>
            <Link className={create_usr_class} to="/create_user/">
              <small>
                <Icon size="lg" name="user-plus" />&nbsp;Create User
              </small>
            </Link>
            <Link className={view_usr_class} to="/view_users/">
              <small>
                <Icon size="lg" name="users" />&nbsp;View Users
              </small>
            </Link>
            <Link className={view_test_class} to="/view_tests/">
              <small>
                <Icon size="lg" name="file-code-o" />&nbsp;View Tests
              </small>
            </Link>
            <Link className={view_ques_class} to="/view_questions/">
              <small>
                <Icon size="lg" name="question-circle-o" />&nbsp;View Questions
              </small>
            </Link>
            <Link className={create_ques_class} to="/create_question/">
              <small>
                <Icon size="lg" name="plus" />&nbsp;Create Question
              </small>
            </Link>
            <Link className={schedule_test_class} to="/schedule_test/">
              <small>
                <Icon size="lg" name="hourglass-half" />&nbsp;Schedule Test
              </small>
            </Link>
          </div>
        ) : (
          <div className="nav flex-column nav-pills mt-5">
            <Link className={dashboard_class} to="/home/">
              <small>
                <Icon size="lg" name="dashboard" />&nbsp;Dashboard
              </small>
            </Link>
          </div>
        )}
      </div>
    );
  }
}
