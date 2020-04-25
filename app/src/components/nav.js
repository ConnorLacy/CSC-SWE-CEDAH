import React from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav, Button} from 'react-bootstrap';
import icon_white from '../assets/icon_white.png';


const MyNav = (props) => {
    const {isAuthenticated} = props
    if(!isAuthenticated) return <></>
    else {
        return (
        <Navbar 
            sticky="top" 
            collapseOnSelect 
            expand="lg" 
            style={{height: 75, background: '#1761a0'}}>
            <Navbar.Brand>
                <img alt="" src={icon_white} style={{height: '3em'}}/>
            </Navbar.Brand>
            <Navbar.Brand>
                {isAuthenticated}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"/>
                <Nav>
                    <Button as={NavLink} to="/logout">Logout</Button>
                </Nav>
             </Navbar.Collapse>
        </Navbar>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, null)(MyNav);