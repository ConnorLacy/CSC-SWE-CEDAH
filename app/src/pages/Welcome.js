import React, {useState} from 'react'
import SignupForm from '../components/SignupForm';
import {Row} from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import logo from '../assets/logo.png';
import logo_dark from '../assets/logo_dark.png';
import {NavLink} from 'react-router-dom';

const Welcome = () => {
    const [signup, toggleForm] = useState(true);
    
    return (
        <div className="welcome">
            <Row>
                <section>
                    <img alt="" src={logo} />
                    <h4 style={{color: 'lightgrey'}}>Making collaboration easy.</h4>    
                </section>
                <section>
                    <div className="inner">
                        <div className="blurb">
                            <img alt="" src={logo_dark} />
                            <p>Here's a blurb about how we make things better</p>
                        </div>
                        <div className="user-actions">
                            <h1>{signup ? 'Join the Team.' : 'Welcome Back!'}</h1>
                            { signup ?
                                        <SignupForm/>
                                        :
                                        <LoginForm/>
                                    }
                            <p style={{padding: 30}}>
                                Already have an account?
                                <NavLink to="" onClick={e => toggleForm(!signup)} style={{marginLeft: 10}}>Log In</NavLink>
                            </p>
                        </div>
                    </div>
                </section>
            </Row>
        </div>
    )
}

export default Welcome;