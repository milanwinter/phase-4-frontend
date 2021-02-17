import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import FormFile from 'react-bootstrap/FormFile'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'


class Login extends Component {




    render() {
        return(
            <div className="Login-container">
                <Container>
                    <Form className="Login-item">
                        <Form.Label> Login</Form.Label>
                        <Form.Group >
                            <Form.Label>Username</Form.Label>
                            <Form.Control name="username" placeholder="Enter username" onChange={(e) => this.props.handleLoginChange(e)}/>
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" onChange={(e) => this.props.handleLoginChange(e)}/>
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={(e) => this.props.handleLoginSubmit(e)}>
                            Login
                        </Button>
                        <p>   </p>
                        <Button variant="success" type="button" onClick={(e) => this.props.toggleLogin(e)}>
                            I don't have an account Sign Me up
                        </Button>
                    </Form>
                    </Container>
                
            </div>
        )
    }
}

export default Login