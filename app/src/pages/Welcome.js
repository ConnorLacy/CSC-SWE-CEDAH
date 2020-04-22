import React, {useState} from 'react'
import SignupForm from '../components/SignupForm';
import {Row} from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import logo from '../assets/logo.png';
import logo_blue_white from '../assets/logo_blue_white.png';
import logo_dark from '../assets/logo_dark.png';
import logo_blue_grey from '../assets/logo_blue_grey.png';
import {NavLink} from 'react-router-dom';

const Welcome = () => {
    const [signup, toggleForm] = useState(true);
    var link, message, form, header;
    if(signup){
        header = 'Join the Team'
        message = 'Already have an account?'
        link = 'Log in'
        form = <SignupForm/>
    } else {
        header = 'Welcome back'
        message = 'Don\'t have an account?'
        link = 'Sign up'
        form = <LoginForm/>
    }
    return (
        <div className="welcome">
            <Row style={{minHeight: '100vh'}}>
                <section>
                    <img alt="" src={logo_blue_white} />
                    <h4 style={{color: 'white'}}>Making collaboration easy.</h4>    
                </section>
                <section>
                    <div className="inner">
                        <div className="blurb">
                            <img alt="" src={logo_blue_grey} />
                            <p>Here's a blurb about how we make things better</p>
                            <p>Here's a blurb about how we make things better</p>
                            <p>Here's a blurb about how we make things better</p>
                            <p>Here's a blurb about how we make things better</p>
                            <p>Here's a blurb about how we make things better</p>
                        </div>
                        <div className="user-actions">
                            <div className="placeholder">
                                <h1>{header}</h1>
                                {form}
                                <p style={{padding: 30}}>
                                    {message}
                                    <NavLink to="" onClick={e => toggleForm(!signup)} style={{marginLeft: 10}}>{link}</NavLink>
                                </p>    
                            </div>
                        </div>
                    </div>
                </section>
            </Row>
        </div>
    )
}

export default Welcome;