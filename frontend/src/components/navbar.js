import React, { Component } from 'react';
import { Navbar as BSNavbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import RedirectWrapper from "../helpers/RedirectOnClick";

class Navbar extends Component {
  render() { 
    const Title = RedirectWrapper((props) => (
      <BSNavbar.Brand
        {...props}
        style={{
          cursor: "pointer"
        }}
      >
         Fun D 
      </BSNavbar.Brand>
    ), "/");

    const ProfileLink = RedirectWrapper((props) => (
      <NavDropdown.Item {...props}>
        My Profile
      </NavDropdown.Item>
    ), "/profile");

    return (
      <BSNavbar
        bg="dark" variant="dark justify-content-between"
        style={{
          "position": "sticky",
          "top": "0px",
          "zIndex": "1000"
        }}
      >
        <Title />
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
            <ProfileLink />
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