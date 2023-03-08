import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export default function AnimeNavbar({ url, setUrl }) {
  const handleSelectSort = e => {
    setUrl(e)
  }

  // console.log("NavBar url: ", url)
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/home" >The Anime Analysts</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/post">Create</Nav.Link>
            <Nav.Link as={Link} to="/aboutme">About Me</Nav.Link>
            <NavDropdown title="Sort By" onSelect={handleSelectSort}>
              <NavDropdown.Item eventKey="date">Date</NavDropdown.Item>
              <NavDropdown.Item eventKey="rating">Rating</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
