import React, { Component } from 'react';

import { Navbar as BSNavbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

class Navbar extends Component {
  render() { 
    return (
      <BSNavbar bg="dark" variant="dark justify-content-between">
        <BSNavbar.Brand> Fun D </BSNavbar.Brand>
        <Nav className="justify-content-end">
          <Form inline>
            <FormControl type="text" placeholder="Search Jobs" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>

          <Nav.Link>Notifications</Nav.Link>
          <Nav.Link>Profile</Nav.Link>
        </Nav>
      </BSNavbar>
    );
  }
}
 
export default Navbar;