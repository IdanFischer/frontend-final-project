import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { signOut } from 'firebase/auth';
import "./animenavbar.css"

export default function AnimeNavbar({ url, setUrl }) {
  const [user, setUser] = useState(false)
  const [auth, setAuth] = useState()
  const handleSelectSort = e => {
    setUrl(e)
  }

  const handleLogOut = () => {
    signOut(auth)
  }

  // console.log("NavBar url: ", url)
  return (
    <Navbar bg="info" expand="lg" className="sticky-top">
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
            {!user ?
              <Nav.Link as={Link} className="login-navbar" to="/login">Login</Nav.Link>
              :
              <Nav.Link as={Button} onSubmit={handleLogOut} className="logout-navbar">Logout</Nav.Link>
            }                          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
