import Button from 'react-bootstrap/Button';
import React from 'react';
import {NavLink} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import {Nav} from 'react-bootstrap'

const NavigationBar = (props) => {

    
    return (
    <div >
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand >Website Name?</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="/"> Home </Nav.Link>
                <Nav.Link href="/playlists">Playlists</Nav.Link>
                <Nav.Link href="/videos">Search Videos</Nav.Link>
                <Nav.Link href="/profile"> Profile</Nav.Link>
              </Nav>
            </Navbar>
    </div>
    )
}

export default NavigationBar;