import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const MyNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar expanded={expanded} onToggle={() => setExpanded(!expanded)} collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">My Website</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#hello">Hello</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
