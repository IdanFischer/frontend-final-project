import { useState } from 'react';
import { auth } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { signOut } from 'firebase/auth';
import "./animenavbar.css"
import { toast } from 'react-toastify';

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
        <Navbar.Brand as={Link} to="/home" >The Anime Analysts</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link className='links' as={Link} to="/home">Home</Nav.Link>
            <Nav.Link className='links' as={Link} to="/post">Create</Nav.Link>
            <Nav.Link className='links' as={Link} to="/aboutme">About Me</Nav.Link>
            <NavDropdown className='links' title="Sort By" onSelect={handleSelectSort}>
              <NavDropdown.Item className='links' eventKey="date">Date</NavDropdown.Item>
              <NavDropdown.Item className='links' eventKey="rating">Rating</NavDropdown.Item>
            </NavDropdown>
            {!user && !googleUser ?
              <Nav.Link as={Link} className='links' to="/login">Login</Nav.Link>
              :
              <Nav.Link as={Button} onClick={handleLogout} className="logout-navbar">Logout</Nav.Link>
            }
            <Nav.Item>
              {googleUser
                ? <p className="username">Welcome {googleUser.displayName}</p>
                : user
                  ? <p className="username">{user.email}</p>
                  : <p className="username">Welcome Guest!</p>}</Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
