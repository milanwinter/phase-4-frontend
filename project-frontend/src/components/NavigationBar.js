import Button from 'react-bootstrap/Button';
import React from 'react';
import {NavLink} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import {Nav} from 'react-bootstrap'

const NavigationBar = (props) => {

  const logout = () => {
    localStorage.clear("token","user")
    window.location.href = "/"
  }

    
    return (
    <div >
      <Container>
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand >Website Name?</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="/"> Home </Nav.Link>
                <Nav.Link href="/profile"> My Profile/Playlists</Nav.Link>
                <Nav.Link href="/playlists">All Playlists</Nav.Link>
                <Nav.Link href="/videos">Search Videos</Nav.Link>
                <Nav.Link href="#" onSelect={logout}> Logout</Nav.Link>
              </Nav>
            </Navbar>
      </Container>
    </div>
    )
}

export default NavigationBar;