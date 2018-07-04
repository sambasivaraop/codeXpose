import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUsers } from "../redux/actionCreators/users";
import Topbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { Row, Col, Card, CardTitle, Table } from "reactstrap";

export class ViewUsers extends Component {
  constructor(props) {
    super(props);
    this.props.getUsers();
  }
  render() {
    var active_view_user_class = "active";
    return (
      <div>
        {localStorage.getItem("user_type") === "INTERVIEWER" ? (
          <div>
            <Topbar activeViewUser={active_view_user_class} />
            <Sidebar
              activeViewUser={active_view_user_class.concat(" bg-info")}
            />
            <Row className="boxStyle">
              <Col md="12">
                <Card body className="border border-primary bgGrey">
                  <CardTitle> View Users </CardTitle>
                  <br />
                  <Table bordered striped className="bg-light" size="sm">
                    <thead>
                      <tr>
                        <th>User Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Id</th>
                        <th>User Type</th>
                        <th>Is Admin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.users.map((users, index) => (
                        <tr key={index}>
                          <th scope="row"> {users.id} </th>
                          <td> {users.first_name} </td>
                          <td> {users.last_name} </td>
                          <td>{users.email}</td>
                          <td>{users.user_type}</td>
                          <td>{users.is_staff.toString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
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
    users: state.userData
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUsers
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewUsers);
