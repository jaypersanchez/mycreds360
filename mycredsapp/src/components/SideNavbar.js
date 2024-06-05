import React from 'react';
import { Link  } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; // For integration with React Router
import '../App.css'; // Import your CSS file containing the styles

const SideNavbar = ({ isActive }) => {
  return (
    <Navbar collapseOnSelect expand="lg" className={isActive ? "side-navbar active-nav" : "side-navbar"} variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="flex-column">
          <LinkContainer to="/dashboard">
            <Nav.Link>Dashboard</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/create-account">
            <Nav.Link>Create Account</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/create-institution">
            <Nav.Link>Create Institution</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/create-certificate-template">
            <Nav.Link>Create Certificate Template</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/create-course">
            <Nav.Link>Create Course</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/badge-creation">
            <Nav.Link>Badge Creation</Nav.Link>
          </LinkContainer>
          {/* Add more links as needed */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default SideNavbar;
