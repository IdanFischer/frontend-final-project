import { useState } from 'react';
import { auth } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { signOut } from 'firebase/auth';
import "./animenavbar.css"
import { toast } from 'react-toastify';
import { Col } from 'react-bootstrap';

export default function AnimeNavbar({ url, setUrl, user, googleUser, setGoogleUser, setUser }) {

  let navigate = useNavigate()

  const handleSelectSort = e => {
    setUrl(e)
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(false);
        setGoogleUser(false);
        navigate("/home")
      })
      .catch((error) => {
        console.error(error);
        toast.error("didnt work")
      });
  };

  // console.log("NavBar url: ", url)
  return (
    <Navbar bg="info" expand="lg" className="sticky-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/home" className='brand-name'>Anime Avenue</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link className='links' as={Link} to="/home">Home</Nav.Link>
            <Nav.Link className='links' as={Link} to="/aboutme">About Me</Nav.Link>
            <NavDropdown className='links' title="Sort By" onSelect={handleSelectSort}>
              <NavDropdown.Item className='links' eventKey="date">Date</NavDropdown.Item>
              <NavDropdown.Item className='links' eventKey="rating">Rating</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className='links' as={Link} to="/post">Create</Nav.Link>
          </Nav>
          {/* <Row> */}
            {/* <Col> */}
              <Nav className="justify-content-between">
                <Nav.Item>
                  {googleUser
                    ? <p className="username">Welcome {googleUser.displayName}!</p>
                    : user
                      ? <p className="username">User!</p>
                      : <p className="username">Welcome Guest!</p>}</Nav.Item>
                {!user && !googleUser ?
                  <Nav.Link as={Link} className='login-navbar' to="/login">Login</Nav.Link>
                  :
                  <Nav.Link as={Link} onClick={handleLogout} className="logout-navbar justify-content-lg-end">Logout</Nav.Link>
                }

              </Nav>
            {/* </Col> */}
          {/* </Row> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
