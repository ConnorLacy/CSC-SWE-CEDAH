import React, {useState} from 'react';
import {connect} from 'react-redux';
import {userLoginFetch} from '../../redux/actions/user';
import {Button, Form, Spinner} from 'react-bootstrap';

const LoginForm = (props) => {
    const [username,  setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loading, loginError, userLoginFetch } = props;

    const handleSubmit = () => {
        let formUser = {
            username: username, 
            password: password
        }
        userLoginFetch(formUser)
    }

    return (
        <Form 
            style={{
                width: '30%',
                margin: 'auto',
                maxWidth: 500,
                minWidth: 250
            }}>
            <Form.Label 
            style={
                { color: 'red', 
                display: 'block', 
                textAlign: 'center'}
            }>{loginError}</Form.Label>
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
            {loading ?
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
                <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            }
        </Form>
    )
}

const mapStateToProps = state => ({
    loginError: state.user.loginError,
})

const mapDispatchToProps = dispatch => ({
    userLoginFetch: formUser => dispatch(userLoginFetch(formUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);