import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import SignupForm from '../components/forms/signup_form';
import {Row} from 'react-bootstrap';
import LoginForm from '../components/forms/login_form';
import logo_blue_white from '../assets/logo_blue_white.png';
import logo_blue_grey from '../assets/logo_blue_grey.png';
import {NavLink, Redirect} from 'react-router-dom';

const Welcome = (props) => {
    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(false)
    const [signup, toggleForm] = useState(true);

    useEffect(() => {
        if(props.isAuthenticated) return setRedirect(true)
        setLoading(state => props.isFetching)
    },[props.isAuthenticated, props.isFetching])

    let loaderProps = {
        loading: loading, 
        setLoading: setLoading,
        toggleForm: toggleForm
    }

    var link, message, form, header;
    if(signup){
        header = 'Join the Team'
        message = 'Already have an account?'
        link = 'Log in'
        form = <SignupForm {...loaderProps}/>
    } else {
        header = 'Welcome back'
        message = 'Don\'t have an account?'
        link = 'Sign up'
        form = <LoginForm {...loaderProps}/>
    }

    if(redirect) return <Redirect push to="/interstitial"/>
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

const mapStateToProps = state =>({
    isAuthenticated: state.user.isAuthenticated,
    isFetching: state.app.isFetching
})

export default connect(mapStateToProps, null)(Welcome);