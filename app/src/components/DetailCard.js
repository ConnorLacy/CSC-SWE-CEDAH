import React from 'react';
import {Card} from 'react-bootstrap';

const DetailCard = (props) => {
    if(props.meeting){
        var title = (
            <>
                <strong>Owner: {props.meeting.owner}</strong>
            </>
        )
        var body = (
            <>
                <strong>Start Time: {props.meeting.start_time}</strong>
                <br/> 
                <strong>End Time: {props.meeting.end}</strong> 
            </>
            )
    }
    else {
        var title = (
            <>
                <strong>{props.member.name}</strong>
            </>
        )
        var body = (
            <>
                <strong>Phone: {props.member.phone}</strong>
                <br/> 
                <strong>Email: {props.member.email}</strong> 
            </>
        )
    }
    return (
        <Card style={{marginBottom: 15}}>
            <Card.Header as="h5">
                <strong>{title}</strong>
                </Card.Header>
            <Card.Body>
                <Card.Text>
                {body}
                With supporting text below as a natural lead-in to additional content.
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default DetailCard;