import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {formatName} from '../helper';
import {getMyGroups} from '../redux/actions/groups';
import DetailCard from '../components/DetailCard';
import Group from '../components/Group';
import Calendar from '../components/Calendar';
import {Container, CardDeck, CardColumns, Spinner, Tab, Row, Col, Nav} from 'react-bootstrap';
import DashboardControl from '../components/DashboardControl';

import user from '../assets/user.svg';
import phone from '../assets/phone.svg';
import mail from '../assets/mail.svg';

const Dashboard = (props) => {

    const [loading, setLoading] = useState(true)
    const [meetingList, setMeetingList] = useState()

    useEffect(() => {
        getData();
    }, [loading, props.meetingList])

    const getData = async () => {
        setLoading(true)
        props.getMyGroups(1, props.token)
        let meetingList = props.groups.map((group) => {
            if(group.meetings.length > 0)
            return group.meetings
        }).filter(meetingList => {
            return meetingList !== undefined
        }).flat()
        console.log('meetingList getData', meetingList)
        setMeetingList(meetingList)
        setLoading(false)
    }

    if(!loading){
        let name = formatName(props.profile.fullName).split(' ')[0]
        console.log('meetingList ', meetingList)

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
                            <img className="large-icon" alt="" src={user}/>
                            <h1>{name}</h1>
                            <div className="info" >
                                <p>
                                    <img src={phone}/>
                                    <span>{props.profile.phone}</span> 
                                </p>
                                <p>
                                    <img src={mail}/>
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
                                {props.groups ?
                                    props.groups.map((group) => (
                                        <Group
                                            key={group.id}
                                            group={group}/>
                                    ))
                                    :
                                    <Spinner animation="border" size="lg"/>
                                }
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <DashboardControl tab={'Meetings'}/>
                            <CardDeck style={{width: '95%', margin: 'auto'}}>
                                <CardColumns>
                                    {meetingList ? 
                                        meetingList.map(meeting => (
                                            <DetailCard
                                                key={meeting.id}
                                                meeting={meeting}/>
                                        ))
                                        : 
                                        <Spinner animation="border" size="lg"/>
                                    }
                                </CardColumns>
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
    else{
        return (
            <div className="page loader">
                <Spinner 
                    animation="border" 
                    size="lg" 
                    style={{
                        width: '4em', 
                        height: '4em',
                    }}/>
            </div>
            )
        }
    }
    
const mapStateToProps = state => ({
    token: state.user.token,
    profile: state.user.profile,
    groups: state.groups.groups,
})

const mapDispatchToProps = dispatch => ({
    getMyGroups : (userId, token) => dispatch(getMyGroups(userId, token))
})
    
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);