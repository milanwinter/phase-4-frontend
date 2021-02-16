import Button from 'react-bootstrap/Button'
import React from 'react'
import {NavLink} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

const NavigationBar = (props) => {

    
    return (
    <div style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '12px' }}>
          <NavLink 
            style={{ marginRight: '10px' }} 
            to="/"
          >
            Login
          </NavLink>
          <NavLink 
            style={{ marginRight: '10px' }} 
            to="/playlists"
          >
            Playlists
          </NavLink>
          <NavLink 
            style={{ marginRight: '10px' }} 
            to="/videos"
          >
            Videos
          </NavLink>
          <NavLink 
            style={{ marginRight: '10px' }} 
            to="/profile"
          >
            Profile
          </NavLink>
    </div>
    )
}

export default NavigationBar;