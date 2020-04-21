import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from '../redux/actions/user';
import {getMyGroups} from '../redux/actions/groups';
import DetailCard from '../components/DetailCard';
import Group from '../components/Group';
import {CardDeck, CardColumns, Spinner} from 'react-bootstrap';
import DashboardControl from '../components/DashboardControl';

const Dashboard = (props) => {

    const [loading, setLoading] = useState(true)
    const [showGroups, toggleShowGroups] = useState(true)

    useEffect(() => {
        getData();
    }, [loading])

    const getData = async () => {
        setLoading(true)
        props.getMyGroups(1, props.token)
        setLoading(false)
    }

    if(!loading){
        return (
            <div className="page dashboard">
                <h1>Welcome to your Dashboard, {props.username}!</h1>
                <DashboardControl toggle={toggleShowGroups}/>
                    { 
                        showGroups ? 
                        <div style={{width: '80%', margin: 'auto'}}>
                            {props.groupList ?
                                props.groupList.map((group) => (
                                    <Group
                                        key={group.group_id}
                                        group={group}/>
                                ))
                                :
                                <Spinner animation="border" size="lg"/>
                            }
                        </div>
                        :
                        <CardDeck style={{width: '80%', margin: 'auto'}}>
                            <CardColumns>
                                {props.meetings ? 
                                    props.meetings.map((meeting) => (
                                        <DetailCard
                                            key={meeting.id}
                                            meeting={meeting}/>
                                    ))
                                    : 
                                    <Spinner animation="border" size="lg"/>
                                }
                            </CardColumns>
                        </CardDeck>
                    }
            </div>
        )
    }
    else{
        return (
            <Spinner animation="border" size="lg"/>
            )
        }
    }
    
    const mapStateToProps = state => ({
        token: state.user.token,
        username: state.user.username,
        userId: state.user.profile.id,
        groupList: state.groups.groupList,
        meetings: state.groups.meetings
    })
    
    const mapDispatchToProps = dispatch => ({
        getUserInfo : (username, token) => dispatch(getUserInfo(username, token)),
        getMyGroups : (userId, token) => dispatch(getMyGroups(userId, token))
    })
    
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);