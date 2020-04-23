import React from 'react';
import { connect } from 'react-redux';
import back from '../assets/back.svg';
import Calendar from '../components/Calendar';
import LeaveGroup from '../components/LeaveGroup';
import DetailCard from '../components/DetailCard';
import {Col, Nav, Row, Tab, Tabs} from 'react-bootstrap';

const Groupviewer = (props) => {
    var group = props.location.group || ''
    var groupId = group.id || ''
    var groupName = group.name || ''

    
    var memberCards = null
    var meetingCards = null
    
    try{
        console.log("Meetings: ", group && group.meetings)
        console.log("Members: ", group && group.members)
        if(typeof(group) !== undefined){
            if(group.members.length > 0) {
                console.log('mapping group members')
                memberCards = group.members.map((member, index) => (
                    <DetailCard
                        key={index}
                        member={member}/>
                ))
            }
            else {
                memberCards = <p>Womp. No members yet!</p>
            }
            if(group.meetings.length > 0){
                console.log('making the meetings cards')
                meetingCards = group.meetings.map((meeting, index) => (
                    <DetailCard
                        key={index}
                        meeting={meeting}/>
                ))
            }
            else {
                meetingCards = <p>Nice. No meetings</p> 
            }
        }
    } catch (err){
        console.log(err)
    }

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
                                {memberCards}
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                            <h1>Meetings</h1>
                            <Tabs defaultActiveKey="list" id="uncontrolled-tab-example">
                                <Tab eventKey="list" title="List">
                                    {meetingCards}
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

const mapStateToProps = (state) => ({
    groups: state.groups.groups
})

export default connect(mapStateToProps, null)(Groupviewer);