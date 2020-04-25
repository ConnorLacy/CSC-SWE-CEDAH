import {batch} from 'react-redux';
import {
    REGISTRATION_ERROR,
    REGISTRATION_SUCCESS,
    LOGIN_USER,
    LOGIN_ERROR,
    LOGOUT_USER,
    LOAD_PROFILE,
    SHOW_MODAL,
} from './types';

import {
    requestStart,
    requestComplete
} from './requests';

const BASE_URL = "https://semiotic-karma-248216.ue.r.appspot.com"
// const BASE_URL = "http://127.0.0.1:8080"

const showModal = (success, message) => ({
    type: SHOW_MODAL,
    payload: {success: success, message: message}
})
const registrationError = message => ({
    type: REGISTRATION_ERROR,
    payload: message
})
const registrationSuccess = status => ({
    type: REGISTRATION_SUCCESS,
    payload: status
})
const loginUser = (userObj, token, bool) => ({
    type: LOGIN_USER,
    payload: { user: userObj, token: token, isAuthenticated: bool }
})
const loginError = message => ({
    type: LOGIN_ERROR,
    payload: message
})
const logoutUser = () => ({
    type: LOGOUT_USER,
    payload: false
})
const loadProfile = (userProfile) => ({
    type: LOAD_PROFILE,
    payload: userProfile
})

export const userLoginFetch = user => {
    return async dispatch => {
        dispatch(requestStart())
        const data = await fetch(`${BASE_URL}/login` , {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then(d => d.json()).catch(err => console.log(err))

        if(data?.message){
            return batch(() => {
                dispatch(loginError(data.message))
                setTimeout(() => {
                    dispatch(loginError(null))
                }, 3000);
                dispatch(requestComplete())
            })
        }
        else if(data?.user){
            return batch(() => {
                dispatch(loginUser(data.user, data.jwt, true))
                dispatch(requestComplete())
            })
        }

        return batch(() => {
            dispatch(showModal(false, 'Error contacting server'))
            dispatch(requestComplete())
        })
    }
}

export const getUserInfo = (username, token) => {
    return async dispatch => {
        dispatch(requestStart())
        let data = await fetch(`${BASE_URL}/users/profile?username=${username}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(d => d.json()).catch(err => console.log(err))
        
        return batch(() => {
            dispatch(loadProfile(data.user))
        })
    }
}

export const logOut = () => {
    localStorage.removeItem('state')
    return dispatch => {
        return dispatch(logoutUser())
    }
}

export const registerUser = (formData) => {
    return async dispatch => {
        dispatch(requestStart())
        const data = await fetch(`${BASE_URL}/users/sign-up`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(d => d.json()).catch(err => console.log(err))

        if(data?.message){
            return batch(() => {
                dispatch(registrationError(data.message))
                setTimeout(() => {
                    dispatch(registrationError(null))
                }, 3000);
                dispatch(requestComplete())
            })
        }
        
        return batch(() => {
            dispatch(showModal(
                    true, 
                    'You created an account successfully! Go ahead and log in to get started!'))
            dispatch(registrationSuccess(true))
            dispatch(requestComplete())
        })
    }
}


