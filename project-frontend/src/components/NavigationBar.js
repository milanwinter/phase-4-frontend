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
            <Navbar bg="dark" variant="dark" >
              <Container>
                <Navbar.Brand >Website Name?</Navbar.Brand>
                <Nav className="mr-auto">
                  <Nav.Link href="/home"> Home </Nav.Link>
                  <Nav.Link href="/profile"> My Profile/Playlists</Nav.Link>
                  <Nav.Link href="/playlists">All Playlists</Nav.Link>
                  <Nav.Link href="/videos">Search Videos</Nav.Link>  
                </Nav>
                <Nav>
                  <Nav.Link href="#" onSelect={logout}> Logout</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
    </div>
    )
}

export default NavigationBar;