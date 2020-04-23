import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import {addGroup, joinGroup} from '../redux/actions/groups';
import { DropdownButton, Form, Button} from 'react-bootstrap'
import { createMeeting } from '../redux/actions/meeting';

const FormDropDown = (props) => {

    const [startTime, setStartTime] = useState('09:00')
    const [endTime, setEndTime] = useState('09:30')
    const [day, setDay] = useState('Monday')
    const [formGroup, setGroup] = useState()
    const [timeError, setTimeError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(startTime>=endTime){
            setTimeError('End time must be after start')
            setTimeout(() => {
                setTimeError('')
            }, 3000); 
        }
        else {
            function parseTime(s) {
                var c = s.split(':');
                return parseInt(c[0]) * 60 + parseInt(c[1]);
             }   
            let duration = (parseTime(endTime)-parseTime(startTime))/60
            let formData = {
                day: day,
                startTime: `${startTime}:00`,
                endTime: `${endTime}:00`,
                duration: `${duration}`,
                userId: `${props.userId}`,
                groupId: formGroup 
            }
            props.createMeeting(formData, props.token)
    
            console.log('Form data: ', formData)
        }
        
    }

    var groups = props.groups || ''
    if(groups){
        var firstChild = groups[0].id
        var inner = groups.map((group, id) => (
            <option key={id} value={group.id}>{group.name}</option>))
    }

    useEffect(() => {
        setGroup(firstChild)

    }, [])
    return (
        <DropdownButton
            alignRight
            title={props.title}
            id="dropdown-menu-align-right"
            style={{height: '25em'}}
            >
            <h4 style={{textAlign: 'center', padding: 10}}>{props.message}</h4>
            <Form validate="true">
                <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                    <Form.Label>Select Day</Form.Label>
                    <Form.Control 
                    as="select" 
                    size="sm"
                    onChange={e => setDay(e.target.value)} 
                    custom>
                        <option key={1} value={'Monday'}>Monday</option>
                        <option key={2} value={'Tuesday'}>Tuesday</option>
                        <option key={3} value={'Wednesday'}>Wednesday</option>
                        <option key={4} value={'Thursday'}>Thursday</option>
                        <option key={5} value={'Friday'}>Friday</option>
                    </Form.Control>
                </Form.Group>
                <Form.Label style={{display: 'block', textAlign: 'center', color: 'red', margin: 'unset'}}>{timeError}</Form.Label>
                <Form.Row>
                    <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                        <Form.Label>Start Time</Form.Label>
                        <br/>
                        <input 
                            className="form-control" 
                            type="time" min="09:00" 
                            step="1800" max="17:00" 
                            value={startTime} 
                            onChange={e=>setStartTime(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                        <Form.Label>End Time</Form.Label>
                        <br/>
                        <input 
                            className="form-control" 
                            type="time" min="09:00" 
                            step="1800" max="17:00" 
                            value={endTime} 
                            onChange={e=>setEndTime(e.target.value)}/>
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                        <Form.Label>Group</Form.Label>
                        <Form.Control as="select" size="sm" onChange={e => setGroup(e.target.value)} custom>
                        {inner}
                        </Form.Control>
                    </Form.Group>
                <Form.Row>
                    <Button variant="primary" onClick={handleSubmit}>Create</Button>
                </Form.Row>
            </Form>
        </DropdownButton>
    )
}

const mapStateToProps = state => ({
    userId: state.user.profile.id,
    token: state.user.token,
    groups: state.groups.groups
})

const mapDispatchToProps = dispatch => ({
    addGroup: (userId, token, value) => dispatch(addGroup(userId, token, value)),
    joinGroup: (userId, token, value) => dispatch(joinGroup(userId, token, value)),
    createMeeting: (formData, token) => dispatch(createMeeting(formData, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormDropDown);