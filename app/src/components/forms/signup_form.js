import React, {useState} from 'react';
import {connect} from 'react-redux';
import {registerUser} from '../../redux/actions/user';
import {Form, Button, Col, Spinner} from 'react-bootstrap';

const SignupForm = (props) => {
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [message, setMessage] = useState("");


    let formData = {
        fullName: fName.concat(' ', lName),
        email: email,
        phone: phone,
        username: username,
        password: password,
    }

    const validateAndSubmit = (e) => {
        e.preventDefault();
        if(password !== password2){
            setMessage("Passwords do not match")
        }
        else {
            e.preventDefault()
            props.setLoading(true);
            console.log("Form data: ", formData)
            props.registerUser(formData).then(() => {
                props.setLoading(false);
                props.toggleForm(false)}
            ) 
        }
    }

        return (
            <Form 
                onSubmit={e => validateAndSubmit(e)}>
                <Form.Label 
                style={
                    { color: 'red', 
                    display: 'block', 
                    textAlign: 'center'}
                }>{props.registrationError}</Form.Label>
                <Form.Row>
                    <Form.Group as={Col} controlId="fname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={fName}
                            onChange={e => setfName(e.target.value)}
                            autoFocus={true}
                            required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="lname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                                type="text" 
                                value={lName}
                                onChange={e => setlName(e.target.value)}
                                required/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            />
                    </Form.Group>
                    <Form.Group as={Col} controlId="tel">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control 
                            type="tel" 
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            required
                            maxLength={10}
                            />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            />
                    </Form.Group>
                </Form.Row>
                <Form.Label 
                    style={
                        { color: 'red', 
                        display: 'block', 
                        textAlign: 'center'}
                    }>{message}</Form.Label>
                <Form.Row>
                    <Form.Group as={Col} controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={password}
                            onChange={e => {setPassword(e.target.value); setMessage("")}}
                            required
                            />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="password2">
                        <Form.Label>Re-enter Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={password2}
                            onChange={e => {setPassword2(e.target.value); setMessage("")}}
                            required
                            />
                    </Form.Group>
                </Form.Row>
                {props.loading ?
                    <Button variant="primary" type="submit"> 
                        <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                />
                        Loading...
                        <span className="sr-only">Loading...</span>
                    </Button>
                    :
                    <Button variant="primary" type="submit">Submit</Button>
                }
            </Form>
        )
    }

const mapStateToProps = state => ({
    registrationError: state.user.registrationError,
    registrationSuccess: state.user.registrationSuccess
})

const mapDispatchToProps = dispatch => ({
    registerUser: formData => dispatch(registerUser(formData))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);