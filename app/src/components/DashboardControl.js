import React from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';

const DashboardControl = (props) => {
    let type = props.tab.trim().toLowerCase()
    return (
            <Container fluid>
                <Col>
                    <Row style={{height: '80px',padding: '15px'}} fluid>
                        <Col>
                            <h1 style={{textAlign: 'left', margin: 'unset'}}>{props.tab}</h1>
                        </Col>
                        <Col style={{display: 'flex', alignItems: 'center'}}>
                            {(type === 'groups') ?
                                <>
                                    <Button 
                                        variant="light">Create Group</Button>    
                                    <Button 
                                        onClick={props.showModal}
                                        variant="light">Join Group</Button>
                                </>
                            :
                                <Button 
                                    onClick={props.showModal}
                                    variant="light">Create Meeting</Button>    
                            }
                        </Col>
                    </Row>
                </Col>
            </Container>
    )
}

export default DashboardControl;