import Calendar from '../components/Calendar';
import LeaveGroup from '../components/LeaveGroup';
import Member from '../components/Member';
import {getMembers} from '../redux/actions/groups';

import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {Col, Nav, Row, Tab, Tabs, Spinner} from 'react-bootstrap';

const Groupviewer = (props) => {
    const [loading, setLoading] = useState(true)

    let groupName = useParams().name
    let groupId = useParams().id

    useEffect(() => {
        getData();
    }, [loading])

    const getData = async () => {
        setLoading(true)
        props.getMembers(groupId, props.token)
        setLoading(false)
    }
    
    if(loading){
        return (
            <Spinner animation="border" size="lg"/>
        )
    }
    else {
        return (
            <div className="page group-viewer">
                <h1 className="slimshady">{groupName}</h1>
                <Tab.Container defaultActiveKey="first" >
                    <Row
                        style={{
                            minHeight: '80vh',
                            width: '95%',
                            margin: 'auto',
                            padding: '20px 5px',
                            boxShadow: '0px 0px 5px lightgrey'
                        }}>
                        <Col 
                            sm={3} 
                            style={{
                                borderRight: '1px solid lightgrey',
                                paddingTop: '15px',
                                paddingBottom: '15px'
                            }}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item >
                                    <Nav.Link eventKey="first">About</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Members</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Meetings</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link 
                                        eventKey="fourth"
                                        className="leave-group">Leave Group
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content style={{padding: '15px'}}>
                                <Tab.Pane eventKey="first">
                                    {'Something 1'}
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                {props.members ?
                                    props.members.map((member, index) => (
                                        <Member
                                            key={index}
                                            member={member}/>
                                    )) :
                                    <Spinner animation="border" size="lg"/>
                                }
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                                    <Tab eventKey="list" title="List">
                                        {'Things'}
                                    </Tab>
                                    <Tab eventKey="calendar" title="Calendar">
                                        <Calendar/>
                                    </Tab>
                                </Tabs>
                                </Tab.Pane>
                                <Tab.Pane eventKey="fourth">
                                    <LeaveGroup
                                        groupId={groupId}
                                        groupName={groupName}/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    members: state.groups.members,
    token: state.user.token
})

const mapDispatchToProps = dispatch => ({
    getMembers: (groupId, token) => dispatch(getMembers(groupId, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Groupviewer);