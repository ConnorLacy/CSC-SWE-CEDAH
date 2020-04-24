import {batch} from 'react-redux';
import {validateEntry} from '../../helper';
import {
    SET_GROUPS,
    SHOW_MODAL,
    REQUEST_START,
    REQUEST_COMPLETE
} from './types'

const BASE_URL = "https://semiotic-karma-248216.ue.r.appspot.com"

const requestStart = () => ({
    type: REQUEST_START
})
const requestComplete = () => ({
    type: REQUEST_COMPLETE
})
const setGroups = (groups) => ({
    type: SET_GROUPS,
    payload: groups
})
const showModal = (success, message) => ({
    type: SHOW_MODAL,
    payload: {success: success, message: message}
})

export const getMyGroups = (userId, token) => {
    return async dispatch => {
        dispatch(requestStart())
        return fetch(`${BASE_URL}/groups/retrieve?id=${userId}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('groups received')
            batch(() => {
                dispatch(setGroups(data.groups))
                dispatch(requestComplete())
            })
        })
        .catch(err => console.log('Error: ', err))
    }
}

export const addGroup = (userId, token, groupName) => {
    return dispatch => {
        if(!validateEntry(groupName)) dispatch(showModal(false, 'Invalid Input'))
        else {
            dispatch(requestStart())
            return fetch(`${BASE_URL}/groups/add?id=${userId}&name=${groupName}`, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                let success = false;
                let message = '';
                if(data.message){
                    console.log('Oops!\n', data.message)
                    message = data.message
                }
                else {
                    console.log('Success\n', data.data)
                    success = true
                    message = data.data
                }
                batch(() => {
                    dispatch(showModal(success, message))
                    dispatch(requestComplete())
                })
            })
            .catch(err => console.log('Error: ', err))
        }
    }
}

export const joinGroup = (userId, token, groupName) => {
    return dispatch => {
        dispatch(requestStart())
        return fetch(`${BASE_URL}/groups/join?id=${userId}&name=${groupName}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            let success = false
            let message = ''
            if(data.message){
                console.log('Something went wrong:\n', data.message)
                message = data.message
            }
            else {
                console.log('Joined group')
                success = true
                message = data.data
            }
            batch(() => {
                dispatch(showModal(success, message))
                dispatch(requestComplete())
            })
        })
        .catch(err => console.log('Error: ', err))
    }
}

export const leaveGroup = (groupId, userId, token) => {
    return dispatch => {
        dispatch(requestStart())
        return fetch(`${BASE_URL}/groups/leave?groupId=${groupId}&userId=${userId}`, {
            method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                let success = false;
                let message = '';
                if(data.message){
                    console.log('Something went wrong:\n', data.message)
                    message = data.message
                }
                else {
                    console.log('Left group')
                    success = true
                    message = data.data
                }
                batch(() => {
                    dispatch(showModal(success, message))
                    dispatch(requestStart())
                })
            })
            .catch(err => console.log('Error: ', err))
    }
}