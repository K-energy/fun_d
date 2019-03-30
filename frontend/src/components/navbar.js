import React, { Component } from 'react';
import { Navbar as BSNavbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render() { 
    return (
      <BSNavbar
        bg="dark" variant="dark justify-content-between"
      >
        <BSNavbar.Brand as={Link} to ="/">
          Fun D
        </BSNavbar.Brand>
        <Nav className="justify-content-end">
          <Form inline>
            <FormControl type="text" size="sm" placeholder="Search Jobs" className="mr-sm-2" />
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