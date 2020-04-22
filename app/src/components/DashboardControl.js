import React from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';

const DashboardControl = (props) => {
    let type = props.tab.trim().toLowerCase()
    console.log(type)
    var buttons;
    switch(type){
        case 'calendar' || 'settings': 
            buttons = <></>
            break;
        case 'groups':
            buttons = (
                <>
                    <Button 
                        variant="light">Create Group</Button>    
                    <Button 
                        onClick={props.showModal}
                        variant="light">Join Group</Button>
                </> 
            )
            break;
        case 'meetings':
            buttons = (
                <Button 
                    onClick={props.showModal}
                    variant="light">Create Meeting</Button>
            )
            break;
        default: break;
    }

    return (
            <Container fluid>
                <Col>
                    <Row style={{height: '80px',padding: '15px'}} fluid>
                        <Col>
                            <h1 style={{textAlign: 'left', margin: 'unset'}}>{props.tab}</h1>
                        </Col>
                        <Col style={{display: 'flex', alignItems: 'center'}}>
                            {buttons}
                        </Col>
                    </Row>
                </Col>
            </Container>
    )
}

export default DashboardControl;