import React from 'react'
import {Route} from 'react-router-dom'
import { withRouter } from 'react-router';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function PlaylistForm(props) {
    return (
        <Form onSubmit={props.handleSubmit} className="block-example border border-dark"> 
            <h3>Add New Playlist</h3>
            <Form.Group>
                <Form.Label>New Playlist Name</Form.Label>
                <Form.Control onChange={props.handleChange}type="text" placeholder="Enter Name" />
             </Form.Group>

            <Button variant="primary" type="submit">
                     Submit
            </Button>
        </Form>
    )
}

export default PlaylistForm