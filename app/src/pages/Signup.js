import React, {useState} from 'react';
import {connect} from 'react-redux';
import {registerUser} from '../redux/actions/user';
import {NavLink, Redirect} from 'react-router-dom';
import SignupForm from '../components/SignupForm';

const Signup = (props) => {
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (e, formData) => {
        e.preventDefault()
        setLoading(true);
        console.log("Form data: ", formData)
        props.registerUser(formData) 
        setLoading(false);       
    }

    if(props.registrationSuccess) return <Redirect to="/login" exact push/>
    else{
        return (
            <>
                <p style={{color: 'red'}}>{props.registrationError}</p>
                <SignupForm 
                    signup
                    isLoading={isLoading}
                    handleSubmit={handleSubmit}/>
                <p style={{padding: 30}}>
                    Already have an account?
                    <NavLink to="/login" style={{marginLeft: 10}}>Log in</NavLink>
                </p>
            </>
        )
    }
}

const mapStateToProps = state => ({
    registrationError: state.user.registrationError,
    registrationSuccess: state.user.registrationSuccess
})

const mapDispatchToProps = dispatch => ({
    registerUser: formData => dispatch(registerUser(formData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);