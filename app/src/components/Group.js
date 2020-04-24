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
                    <img alt="" src={group} style={{height: '3em'}}/>
                </div>
                <span style={{padding: '15px'}}>
                    <strong>{props.group.name}</strong><br/>
                    <strong>Owner</strong> {formatName(props.group.owner.fullname)}
                </span>
                </Card.Header>
            <Card.Body>
                <Card.Text>
                With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button 
                    as={NavLink}
                    to={{
                        pathname:`/view/${props.group.name}/${props.group.id}`,
                        group: props.group
                    }}
                    variant="primary" 
                    >
                        Open Group
                </Button>
            </Card.Body>
        </Card>
    )
}

export default Group;