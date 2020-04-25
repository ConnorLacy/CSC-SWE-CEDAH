import React from 'react';
import {formatName} from '../../helper';
import {formatTime} from '../../helper';
import {Card} from 'react-bootstrap';
import clock from '../../assets/clock.svg';
import phone from '../../assets/phone.svg';
import mail from '../../assets/mail.svg';
import user from '../../assets/user.svg';
import crown from '../../assets/crown.svg';

const DetailCard = (props) => {
    var title;
    var body;
    const {
        meeting,
        ownerId,
        member
    } = props

    if(meeting){
        title = <strong>{meeting.day}</strong>
        body = (
            <>
                <p>
                    <img alt="" className="icon" src={user}/>
                    <span><strong>Host </strong> {formatName(meeting.creator)}</span>
                </p>
                <p>
                    <img alt="" className="icon" src={clock}/>
                    <span><strong>Start Time </strong> {formatTime(meeting.start_time)}</span>
                </p>
                <p>
                    <img alt="" className="icon" src={clock}/>
                    <span><strong>End Time </strong> {formatTime(meeting.end_time)}</span>
                </p>
            </>
        )
    }
    else {
        title = (
                    <>
                        {(ownerId === member.id) ? 
                            <img src={crown} alt="" style={{height: '2em', marginRight: 10}}/> : ''}
                        <strong>{formatName(member.name)}</strong>
                    </>
                )
        body = (
            <>
                <p>
                    <img alt="" className="icon" src={phone}/>
                    <span>{member.phone}</span>
                </p>
                <p>
                    <img alt="" className="icon" src={mail}/>
                    <a href={"mailto: "  + member.email}>
                        <span>{member.email}</span> 
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