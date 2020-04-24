import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {logOut} from '../redux/actions/user';
import {MySpinner} from '../components/spinner';

const Logout = (props) => {

    useEffect(() => {
        setTimeout(() => {
            props.logOut()
        }, 2000);
    })
    
    return (
        <div className="page logout">
            <div className="goodbye">
                <h1>Come back soon!</h1>
                <p>Logging you out.</p>
                <MySpinner/>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logOut())
})

export default connect(null, mapDispatchToProps)(Logout);