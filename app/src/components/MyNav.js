import React from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';


const MyNav = (props) => {
    return (
        <Navbar 
            sticky="top" 
            collapseOnSelect 
            expand="lg" 
            bg="dark" 
            variant="dark">
            <Navbar.Brand as={NavLink} to="/">
            Brand link
            </Navbar.Brand>
            <Navbar.Brand as={NavLink} to="/">
            {props.isAuthenticated}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    { props.isAuthenticated ?  
                        <NavLink style={{color: 'white'}} to="/dashboard">Dashboard</NavLink>
                        :
                        <></>
                    }
                </Nav>
                <Nav>
                    {props.isAuthenticated ? 
                    <>
                        <Button as={NavLink} 
                                to="/profile"
                                variant="success"
                                className="mynav button"
                                style={{margin: '0px 10px'}}>Profile</Button>
                        <Button as={NavLink} to="/logout">Logout</Button>
                    </>
                    :
                    <>
                        <Button as={NavLink} 
                                to="/login"
                                variant="light" 
                                className="mynav button"
                                style={{margin: '0px 10px'}}>Login</Button>
                        <Button as={NavLink} to="/signup">Signup</Button>
                    </>
                    }
                </Nav>
             </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, null)(MyNav);