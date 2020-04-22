import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {getUserInfo} from '../redux/actions/user';
import {Spinner} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

const Fetcher = (props) => {

    useEffect(() => {
        props.getUserInfo(props.username, props.token)
    }, [])

    if(props.profile) return <Redirect push to="/dashboard"/>
    else {
        return (
            <>
                <div className="page logout">
                    <div className="goodbye">
                        <h1>Sit tight!</h1>
                        <p>Getting your information ready.</p>
                        <Spinner animation="border" size="lg"/>
                    </div>
                </div>
            </>

        )
    }
}

const mapStatetoProps = state => ({
    token: state.user.token,
    username: state.user.username,
    profile: state.user.profile
})

const mapDispatchToProps = dispatch => ({
    getUserInfo: (username, token) => dispatch(getUserInfo(username, token))
})

export default connect(mapStatetoProps, mapDispatchToProps)(Fetcher);