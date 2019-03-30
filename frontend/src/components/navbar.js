import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Navbar as BSNavbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';

class Navbar extends Component {
  onSubmit = (e) => {
    e.preventDefault();
    this._searchBox.value = "";
    return false;
  }
  render() { 
    return (
      <BSNavbar
        bg="success" variant="dark justify-content-between"
      >
        <BSNavbar.Brand as={Link} to ="/" style={{
          display: "flex",
          alignItems: "center"
        }}>
          <img
            alt="logo" src={require("../resources/img/fund_logo_white_no_word.png")}
            style={{
              width: "50px",
              height: "35px",
              objectFit: "contain"
            }}
          />
          Fun D
        </BSNavbar.Brand>
        <Nav className="justify-content-end">
          <Form inline onSubmit={this.onSubmit}>
            <FormControl ref={(me) => this._searchBox = me } type="text" size="sm" placeholder="Search Jobs" className="mr-sm-2" />
            <Nav.Link>
              <i className="fas fa-search" />
            </Nav.Link>
          </Form>

          <Nav.Link>
            <i className="fas fa-bell" />
          </Nav.Link>
          <NavDropdown title={<i className="fas fa-user-circle"/>} alignRight>
            <NavDropdown.Item as={Link} to ="/profile">
              My Profile
            </NavDropdown.Item>
            <NavDropdown.Item>
              My Events
            </NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </BSNavbar>
    );
  }
}
 
export default Navbar;