import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../redux/actionCreators/auth";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import userImg from "../img/user-icon.png";

export class Topbar extends React.Component {
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
  handleClick = () => {
    this.props.logout();
  };
  render() {
    var test_class = this.props.activeTest;
    var dropDownItemClass = "dropdown-item";
    var navClass = "nav-link";
    var view_usr_active = dropDownItemClass + " " + this.props.activeViewUser;
    var create_usr_active =
      dropDownItemClass + " " + this.props.activeCreateUser;
    var dashboard_active = navClass + " " + this.props.activeDashboard;
    return (
      <Navbar color="info" light expand="lg" fixed="top">
        <NavLink className="navbar-brand" to="#">
          Codexpose
        </NavLink>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className={dashboard_active} to="/dashboard">
                Home
              </Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle
                nav
                caret
                className={
                  this.props.activeViewUser || this.props.activeCreateUser
                    ? "active"
                    : ""
                }
              >
                User
              </DropdownToggle>
              <DropdownMenu>
                <Link className={create_usr_active} to="/create_user/">
                  Create User
                </Link>
                <Link className={view_usr_active} to="/view_users">
                  View Users
                </Link>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem className={test_class}>
              <Link className="nav-link" to="/test">
                Test
              </Link>
            </NavItem>
          </Nav>
          <Nav navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <img src={userImg} alt="user-logo" width="14" height="14" />&nbsp;
                <small>test.user@xx.com</small>
              </DropdownToggle>
              <DropdownMenu right>
                <Link className="dropdown-item" to="#">
                  My Profile
                </Link>
                <DropdownItem divider />
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={this.handleClick}
                >
                  Logout
                </Link>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch);
}
export default connect(
  null,
  mapDispatchToProps
)(Topbar);
