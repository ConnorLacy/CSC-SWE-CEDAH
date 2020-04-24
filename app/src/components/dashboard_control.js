import React from 'react';
import CustomDropdown from './CustomDropdown';
import FormDropDown from './FormDropDown';
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
                    <CustomDropdown 
                        title={'Create Group'} 
                        message={'Enter the group you wish to Create'}
                        placeholder={'Group Name'}
                        create/>    
                    <CustomDropdown 
                        title={'Join Group'} 
                        message={'Enter the group you wish to Join'}
                        placeholder={'Group Name'}
                        join/>    
                </> 
            )
            break;
        case 'meetings':
            buttons = (
                <FormDropDown 
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