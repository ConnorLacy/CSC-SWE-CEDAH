import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {formatName} from '../helper';
import {getUserInfo} from '../redux/actions/user';
import {getMyGroups} from '../redux/actions/groups';
import DetailCard from '../components/cards/detail_card';
import Group from '../components/cards/group_card';
import Fetcher from '../pages/fetcher';
import Calendar from '../components/calendar';
import {Container, CardDeck, CardColumns, Tab, Row, Col, Nav} from 'react-bootstrap';
import DashboardControl from '../components/dashboard_control';

import user from '../assets/user.svg';
import phone from '../assets/phone.svg';
import mail from '../assets/mail.svg';

const Dashboard = (props) => {
    const [loading, setLoading] = useState(true)

    const { 
        username, 
        token, 
        profile, 
        groups, 
        isFetching, 
        getUserInfo,
        getMyGroups } = props

    useEffect(() => {
        getUserInfo(username, token)
        console.log('launched profile fetch')
    }, [])

    useEffect(() => {
        if(profile !== null) {
            console.log('profile here: ', profile)
            console.log('fetching groups')
            getMyGroups(profile.id, token)
        }
    }, [profile])

    useEffect(() => {
        if(groups !== null) {
            console.log('groups here: ', groups)
            console.log('setting loading state to false')
            setLoading(state => isFetching)
        }
    }, [groups])

    if(loading){
        return (<Fetcher/>)
    }
    else {
        let name = formatName(profile.fullName).split(' ')[0]
        var groupCards = null
        var meetingCards = null
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
        let meetings = groups.map(({meetings})=>meetings).flat()
        let cards = meetings.map((meeting, index)=> (
            <DetailCard
                key={index}
                meeting={meeting}/>
        ))
        var meetingCards = (
            <CardColumns>
                {cards.length > 0 ? cards : <p>Nice, no meetings yet</p>}
            </CardColumns>
        )
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
                                    <span>{profile.phone}</span> 
                                </p>
                                <p>
                                    <img alt="" src={mail}/>
                                    <span>{profile.email}</span> 
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
                            {/* <DashboardControl tab={'Groups'}/> */}
                            <div style={{width: '95%', margin: 'auto'}}>
                                {groupCards}
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            {/* <DashboardControl tab={'Meetings'}/> */}
                            <CardDeck style={{width: '95%', margin: 'auto'}}>
                                {meetingCards}
                            </CardDeck>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            {/* <DashboardControl tab={'Calendar'}/> */}
                            <Calendar/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="fourth">
                            {/* <DashboardControl tab={'Settings'}/> */}
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                    </Row>
                    </Container>
                </Tab.Container>
            </div>
        )
    }
}  


const mapStateToProps = state => ({
    token: state.user.token,
    username: state.user.username,
    profile: state.user.profile,
    groups: state.groups.groups,
    isFetching: state.app.isFetching
})

const mapDispatchToProps = dispatch => ({
    getUserInfo: (username, token) => dispatch(getUserInfo(username, token)),
    getMyGroups : (userId, token) => dispatch(getMyGroups(userId, token))
})
    
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);