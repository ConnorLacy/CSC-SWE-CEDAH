import React from 'react';
import {formatTime} from '../../helper';
import {Card} from 'react-bootstrap';
import clock from '../../assets/clock.svg';
import vote from '../../assets/vote.svg';

const PossibleMeeting = (props) => {
    const { meeting } = props

    const title = <strong>{meeting.day}</strong>
    const body = (
        <>
            <p>
                <img alt="" className="icon" src={clock}/>
                <span><strong>Start Time </strong> {formatTime(meeting.startTime)}</span>
            </p>
            <p>
                <img alt="" className="icon" src={clock}/>
                <span><strong>End Time </strong> {formatTime(meeting.endTime)}</span>
            </p>
            <p>
                <img alt="" className="icon" src={vote}/>
                <span> {meeting.voteCount}</span>
            </p>
        </>
    )
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

export default PossibleMeeting;