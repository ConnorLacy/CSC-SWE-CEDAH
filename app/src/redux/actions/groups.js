import {validateEntry} from '../../helper';

const BASE_URL = "https://semiotic-karma-248216.ue.r.appspot.com"

export const getMyGroups = (userId, token) => {
    console.log('base url: ', BASE_URL)
    console.log('Getting my groups')
    return async dispatch => {
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
            dispatch(setGroups(data.groups))
        })
        .catch(err => console.log('Error: ', err))
    }
}

export const addGroup = (userId, token, groupName) => {
    return dispatch => {
        if(!validateEntry(groupName)) dispatch(showModal('SHOW_MODAL', false, 'Invalid Input'))
        else {
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
                dispatch(showModal('SHOW_MODAL', success, message))
            })
            .catch(err => console.log('Error: ', err))
        }
    }
}

export const joinGroup = (userId, token, groupName) => {
    return dispatch => {
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
            dispatch(showModal('SHOW_MODAL', success, message))
        })
        .catch(err => console.log('Error: ', err))
    }
}

export const leaveGroup = (groupId, userId, token) => {
    return dispatch => {
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
                dispatch(showModal('SHOW_MODAL', success, message))
            })
            .catch(err => console.log('Error: ', err))
    }
}

const setGroups = (groups) => ({
    type: 'FETCH_GROUPS',
    payload: groups
})

const showModal = (type, success, message) => ({
    type: type,
    payload: {success: success, message: message}
})