import React from 'react';
import {formatName} from '../helper';
import {Card} from 'react-bootstrap';
import clock from '../assets/clock.svg';
import phone from '../assets/phone.svg';
import mail from '../assets/mail.svg';
import user from '../assets/user.svg';
import crown from '../assets/crown.svg';

const DetailCard = (props) => {
    var title;
    var body;
    if(props.meeting){
        title = <strong>{props.meeting.day}</strong>
        body = (
            <>
                <p>
                    <img alt="" className="icon" src={user}/>
                    <span><strong>Host | </strong> {formatName(props.meeting.creator)}</span>
                </p>
                <p>
                    <img alt="" className="icon" src={clock}/>
                    <span><strong>Start Time | </strong> {props.meeting.start_time}</span>
                </p>
                <p>
                    <img alt="" className="icon" src={clock}/>
                    <span><strong>End Time | </strong> {props.meeting.end_time}</span>
                </p>
            </>
        )
    }
    else {
        title = (
                    <>
                        {(props.ownerId === props.member.id) ? 
                            <img src={crown} alt="" style={{height: '2em', marginRight: 10}}/> : ''}
                        <strong>{formatName(props.member.name)}</strong>
                    </>
                )
        body = (
            <>
                <p>
                    <img alt="" className="icon" src={phone}/>
                    <span>{props.member.phone}</span>
                </p>
                <p>
                    <img alt="" className="icon" src={mail}/>
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
                {body}
            </Card.Body>
        </Card>
    )
}

export default DetailCard;