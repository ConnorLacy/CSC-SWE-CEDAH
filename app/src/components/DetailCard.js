import React from 'react';
import {formatName} from '../helper';
import {Card} from 'react-bootstrap';
import clock from '../assets/clock.svg';
import phone from '../assets/phone.svg';
import mail from '../assets/mail.svg';
import user from '../assets/user.svg';

const DetailCard = (props) => {

    if(props.meeting){
        var title = (
            <>  
                <img src={user} className="icon"/>
                <strong>{formatName(props.meeting.creator)}</strong>
            </>
        )
        var body = (
            <>
                <p>
                    <img className="icon" src={clock}/>
                    <span>Start Time: {props.meeting.start_time}</span>
                </p>
                <p>
                    <img className="icon" src={clock}/>
                    <span>End Time: {props.meeting.end_time}</span>
                </p>
            </>
        )
    }
    else {
        var title = (
            <>
                <strong>{formatName(props.member.name)}</strong>
            </>
        )
        var body = (
            <>
                <p>
                    <img className="icon" src={phone}/>
                    <span>{props.member.phone}</span>
                </p>
                <p>
                    <img className="icon" src={mail}/>
                    <a href={"mailto: "  + props.member.email}>
                        <span>{props.member.email}</span> 
                    </a>
                </p>
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
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default DetailCard;