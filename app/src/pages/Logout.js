import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {logOut} from '../redux/actions/user';
import {Redirect} from 'react-router-dom';
import {MySpinner} from '../components/MySpinner';

const Logout = (props) => {

    useEffect(() => {
        setTimeout(() => {
            props.logOut()
        }, 2000);
    })
    
    if(!props.isAuthenticated) return <Redirect push to="/"/>
    else {
        return (
            <>
                <div className="page logout">
                    <div className="goodbye">
                        <h1>Come back soon!</h1>
                        <p>Logging you out.</p>
                        <MySpinner/>
                    </div>
                </div>
            </>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logOut())
})

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
  })

export default connect(mapStateToProps, mapDispatchToProps)(Logout);