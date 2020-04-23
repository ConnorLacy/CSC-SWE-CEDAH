import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {formatName} from '../helper';
import {getMyGroups} from '../redux/actions/groups';
import DetailCard from '../components/DetailCard';
import Group from '../components/Group';
import Calendar from '../components/Calendar';
import {Container, CardDeck, CardColumns, Tab, Row, Col, Nav} from 'react-bootstrap';
import DashboardControl from '../components/DashboardControl';

import user from '../assets/user.svg';
import phone from '../assets/phone.svg';
import mail from '../assets/mail.svg';

const Dashboard = (props) => {

    var groups = props.groups
    var meetings = []
    var profile = props.profile
    var name = ''
    var groupCards = null
    var meetingCards = null
    
    if(profile) {name = formatName(props.profile.fullName).split(' ')[0]}
    if(groups){
        if (groups.length === 0) {
            groupCards = <p>Womp. You're not in any groups yet!</p>
        }
        else{
            groupCards = groups.map((group, index) => (
                    <Group
                        key={index}
                        group={{...group}}
                        members={group.members}/>
                    ))
        }
    }
    if(meetings){
        if(meetings.length === 0){
            meetingCards = <p>You have no meetings at this time</p>
        }
        else {
            let meetingArr = props.groups.groups.map(({meetings}) => meetings).flat()
            meetingCards = meetingArr.map(({meeting, index}) => (
                <DetailCard
                    key={index}
                    meeting={meeting}/>
                ))
            meetingCards = (
                <CardColumns>
                    {meetingCards}
                </CardColumns>
            )
        }
    }
    
    useEffect(() => {
        props.getMyGroups(props.profile.id, props.token)
    }, [props.showModal])

    return (
        <div className="page dashboard">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Container fluid>
                <Row className="myRow">
                    <Col 
                        style={{
                            height: '100%',
                            borderRight: '1px solid lightgrey',
                            paddingTop: '30px',
                            paddingBottom: '30px'
                        }}>
                    <div className="user">
                        <img alt="" className="large-icon" alt="" src={user}/>
                        <h1>{name}</h1>
                        <div className="info" >
                            <p>
                                <img alt="" src={phone}/>
                                <span>{props.profile.phone}</span> 
                            </p>
                            <p>
                                <img alt="" src={mail}/>
                                <span>{props.profile.email}</span> 
                            </p>
                        </div>
                    </div>
                    <Nav justify variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Groups</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Meetings</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third">Calendar</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="fourth">Settings</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9} style={{height: '100%', overflow: 'auto'}}>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                        <DashboardControl tab={'Groups'}/>
                        <div style={{width: '95%', margin: 'auto'}}>
                            {groupCards}
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        <DashboardControl tab={'Meetings'}/>
                        <CardDeck style={{width: '95%', margin: 'auto'}}>
                            {meetingCards}
                        </CardDeck>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                        <DashboardControl tab={'Calendar'}/>
                        <Calendar/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                        <DashboardControl tab={'Settings'}/>
                    </Tab.Pane>
                </Tab.Content>
                </Col>
                </Row>
                </Container>
            </Tab.Container>
        </div>
    )
}   
    
const mapStateToProps = state => ({
    token: state.user.token,
    profile: state.user.profile,
    groups: state.groups.groups,
    showModal: state.app.showModal
})

const mapDispatchToProps = dispatch => ({
    getMyGroups : (userId, token) => dispatch(getMyGroups(userId, token))
})
    
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);