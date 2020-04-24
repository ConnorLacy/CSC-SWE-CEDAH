import React, {useState} from 'react'
import {connect} from 'react-redux';
import {addGroup, joinGroup} from '../../redux/actions/groups';
import { DropdownButton, Form, InputGroup, Button} from 'react-bootstrap'

const DropdownForm = (props) => {

    const [value, setValue] = useState('')

    return (
        <DropdownButton
            alignRight
            title={props.title}
            id="dropdown-menu-align-right"
            >
            <h4 style={{textAlign: 'center', padding: 10}}>{props.message}</h4>
            <InputGroup className="mb-3" style={{padding: 10}}>
                <Form.Control
                    placeholder={props.placeholder}
                    aria-label={props.placeholder}
                    value={value}
                    autoFocus={true}
                    onChange={(e) => setValue(e.target.value)}
                />
                <InputGroup.Append>
                {props.join ? 
                    <Button key={1} variant="primary" onClick={() => props.joinGroup(props.userId, props.token, value)}>Join</Button>
                :
                    <Button key={2} variant="primary" onClick={() => {
                        props.addGroup(props.userId, props.token, value)}}>Add</Button>
                }
                    
                </InputGroup.Append>
            </InputGroup>
        </DropdownButton>
    )
}

const mapStateToProps = state => ({
    userId: state.user.profile.id,
    token: state.user.token
})

const mapDispatchToProps = dispatch => ({
    addGroup: (userId, token, value) => dispatch(addGroup(userId, token, value)),
    joinGroup: (userId, token, value) => dispatch(joinGroup(userId, token, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(DropdownForm);