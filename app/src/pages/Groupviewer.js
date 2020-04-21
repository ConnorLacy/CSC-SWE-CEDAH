import back from '../assets/back.svg';
import Calendar from '../components/Calendar';
import LeaveGroup from '../components/LeaveGroup';
import DetailCard from '../components/DetailCard';
import {getDetails} from '../redux/actions/groups';

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
        props.getDetails(groupId, props.token)
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
                <div className="header back-button">
                        <img 
                            alt=""
                            onClick={props.history.goBack}
                            src={back}/>
                        <h1>{groupName}</h1>
                </div>
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
                                    <h1>About</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non lobortis turpis. Fusce tortor ante, pharetra at dolor sit amet, aliquet viverra turpis. Fusce mauris tortor, pulvinar a nulla vitae, pulvinar pretium tortor. Integer consectetur orci velit, in tempus quam tempor ut. Phasellus nec mollis tortor, in cursus mi. Pellentesque interdum hendrerit magna. Donec porta, ligula at vestibulum feugiat, ex quam faucibus nunc, at vulputate ex magna vitae lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed gravida aliquet eros, sed maximus nisi tristique eget. Fusce egestas ex nec neque pulvinar gravida. Mauris ut malesuada ante. Morbi facilisis ligula sed imperdiet commodo. In sagittis magna in odio luctus, vel tincidunt neque dapibus. Phasellus mollis dolor a leo laoreet commodo. Donec tincidunt lectus ex, ac dapibus nisi fermentum eu.</p>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <h1>Members</h1>
                                    {props.members ?
                                        props.members.map((member, index) => (
                                            <DetailCard
                                                key={index}
                                                member={member}/>
                                        )) :
                                        <Spinner animation="border" size="lg"/>
                                    }
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                <h1>Meetings</h1>
                                <Tabs defaultActiveKey="list" id="uncontrolled-tab-example">
                                    <Tab eventKey="list" title="List">
                                        {props.meetings ?
                                            (props.meetings.length > 0) ? 
                                                props.meetings.map((meeting, index) => (
                                                    <DetailCard
                                                        key={index}
                                                        meeting={meeting}/>
                                                )) :
                                                <p>You have no meetings at this time.</p>
                                            :
                                            <Spinner animation="border" size="lg"/>
                                        }
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
    meetings: state.groups.meetings,
    token: state.user.token
})

const mapDispatchToProps = dispatch => ({
    getDetails: (groupId, token) => dispatch(getDetails(groupId, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Groupviewer);