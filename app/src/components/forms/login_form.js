import React, {useState} from 'react';
import {connect} from 'react-redux';
import {userLoginFetch} from '../../redux/actions/user';
import {Button, Form, Spinner} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';


const LoginForm = (props) => {
    console.log(props)
    const [username,  setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.setLoading(true);
        let formUser = {
            username: username, 
            password: password
        }
        setTimeout(() => {props.userLoginFetch(formUser).then(props.setLoading(false))}, 3000)
    }

    if(props.isAuthenticated) return <Redirect push exact to="/fetcher"/>
    else {
        return (
            <Form 
                style={{
                    width: '30%',
                    margin: 'auto',
                    maxWidth: 500,
                    minWidth: 250
                }}
                onSubmit={e => handleSubmit(e)}>
                <Form.Label 
                style={
                    { color: 'red', 
                    display: 'block', 
                    textAlign: 'center'}
                }>{props.loginError}</Form.Label>
                <Form.Group controlId="formGroupUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter username" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        autoFocus={true}
                        required/>
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required/>
                </Form.Group>
                {props.loading ?
                    <Button variant="primary" type="submit"> 
                        <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                />{'  '}
                        Loading...
                        <span className="sr-only">Loading...</span>
                    </Button>
                    :
                    <Button variant="primary" type="submit">Submit</Button>
                }
            </Form>
        )
    }
}

const mapStateToProps = state => ({
    loginError: state.user.loginError,
    isAuthenticated: state.user.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
    userLoginFetch: formUser => dispatch(userLoginFetch(formUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);