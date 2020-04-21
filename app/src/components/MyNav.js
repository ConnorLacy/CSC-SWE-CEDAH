import React from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav, Button} from 'react-bootstrap';
import group from '../assets/group.svg';


const MyNav = (props) => {
    return (
        <Navbar 
            sticky="top" 
            collapseOnSelect 
            expand="lg" 
            bg="dark" 
            variant="dark"
            style={{height: 75}}>
            <Navbar.Brand as={NavLink} to="/">
                <img alt="" src={group} style={{height: '3em'}}/>
            </Navbar.Brand>
            <Navbar.Brand as={NavLink} to="/">
            {props.isAuthenticated}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"/>
                <Nav>
                    {props.isAuthenticated ? 
                    <>
                        <Button as={NavLink} 
                                to="/dashboard"
                                variant="success"
                                className="mynav button"
                                style={{margin: '0px 10px'}}>Dashboard</Button>
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