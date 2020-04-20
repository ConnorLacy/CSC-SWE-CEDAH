import React from 'react';
import {Card, Button, ButtonGroup} from 'react-bootstrap';
import icon from '../assets/business.svg';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

const Meeting = (props) => {

    return (
        <Card 
            bg="primary" 
            text="light" 
            style={
                {
                    marginLeft: 'auto', 
                    marginRight: 'auto'
                }
            }>
            <Card.Header style={{background: 'white', color: 'black'}}>{props.meeting.MeetingNo}</Card.Header>
            <Card.Img variant="top" src={icon}/>
            <Card.Body>
                <Card.Title>Created By: {props.meeting.creator}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.<br/><br/>
                    Host: {props.meeting.Host}<br/>
                    Start: {props.meeting.Start}<br/>
                    End: {props.meeting.End}<br/>
                </Card.Text>
                <ButtonGroup style={{width: '100%'}}>
                    <Button variant="light" style={{width: '80%'}}>Join Meeting</Button>
                    <Button variant="info" style={{width: '20%', padding: '10px'}}>
                        <SettingsRoundedIcon />
                    </Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    )
}

export default Meeting;