import React from 'react';
import user from '../assets/user.svg';
import mail from '../assets/mail.svg';
import phone from '../assets/phone.svg';
import { formatName } from '../helper';
import { connect } from 'react-redux';

const Profile = (props) => {
    let name = formatName(props.profile.fullName)
    return ( 
        <div className="page profile">
            <div className="hat">
                <img style={{height: '15em'}} alt="" src={user}/>
                <h1 style={{padding: 15}}>{name}</h1>
                <div className="info" >
                    <p>
                        <img style={{height: '3em', marginRight: 15}} src={phone}/>
                        <span>{props.profile.phone}</span> 
                    </p>
                    <p>
                        <img style={{height: '3em', marginRight: 15}} src={mail}/>
                        <span>{props.profile.email}</span> 
                    </p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    profile : state.user.profile
})

export default connect(mapStateToProps, null)(Profile);