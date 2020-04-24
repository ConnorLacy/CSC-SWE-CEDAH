import React from 'react';
import DropdownForm from './forms/dropdown_form';
import SimpleDropdownForm from './forms/simple_dropdown_form';
import {Col, Container, Row} from 'react-bootstrap';

const DashboardControl = (props) => {
    let type = props.tab.trim().toLowerCase()
    var buttons;
    switch(type){
        case 'calendar' || 'settings': 
            buttons = <></>
            break;
        case 'groups':
            buttons = (
                <>
                    <DropdownForm 
                        title={'Create Group'} 
                        message={'Enter the group you wish to Create'}
                        placeholder={'Group Name'}
                        create/>    
                    <DropdownForm 
                        title={'Join Group'} 
                        message={'Enter the group you wish to Join'}
                        placeholder={'Group Name'}
                        join/>    
                </> 
            )
            break;
        case 'meetings':
            buttons = (
                <SimpleDropdownForm 
                        title={'Create Meeting'} 
                        message={'Enter Details'}
                        meeting/> 
            )
            break;
        default: break;
    }

    return (
            <Container fluid>
                <Col>
                    <Row style={{height: '80px',padding: '15px'}}>
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