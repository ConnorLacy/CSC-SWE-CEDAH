import React from 'react';
import {formatName} from '../helper';
import {Button, Card} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import group from '../assets/group.svg';

const Group = (props) => {
    return (
        <Card style={{marginBottom: 15}}>
            <Card.Header as="h5" style={{display: 'flex'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={group} style={{height: '3em'}}/>
                </div>
                <span style={{padding: '15px'}}>
                    <strong>{props.group.group_name}</strong><br/>
                    <strong>Owner</strong> {formatName(props.group.owner_fullName)}
                </span>
                </Card.Header>
            <Card.Body>
                <Card.Text>
                With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button 
                    as={NavLink}
                    to={`/group/view/${props.group.group_name}/${props.group.group_id}`}
                    variant="primary" 
                    >
                        Open Group
                </Button>
            </Card.Body>
        </Card>
    )
}

export default Group;