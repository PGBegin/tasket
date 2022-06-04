import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useStore } from '../stores/store';

export default observer ( function NavBar() {
    const {userStore: {user, logout}} = useStore();

    return(
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/">Tasket</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/tasks">Tasks</Nav.Link>
                        {
                            user ? 
                                <>
                                    <Nav.Link as={NavLink} to="/statuses">Status</Nav.Link>
                                    <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                                    <Nav.Link as={NavLink} to="/errors">Errors</Nav.Link>
                                    <Nav.Link as={NavLink} to="/logout">{user.username} </Nav.Link>
                                </>                            
                                :
                                <>
                                    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
})