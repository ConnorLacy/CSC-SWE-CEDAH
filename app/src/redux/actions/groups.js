import {batch} from 'react-redux';
import {validateEntry} from '../../helper';
import {
    SET_GROUPS,
    SHOW_MODAL,
    REQUEST_START,
    REQUEST_COMPLETE
} from './types'

const BASE_URL = "https://semiotic-karma-248216.ue.r.appspot.com"
// const BASE_URL = "http://127.0.0.1:8080"


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
        const data = await fetch(`${BASE_URL}/groups/retrieve?id=${userId}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json()).catch(err => console.log(err))

        return batch(() => {
                dispatch(setGroups(data.groups))
                dispatch(requestComplete())
            })
    }
}

export const addGroup = (userId, token, groupName) => {
    return async dispatch => {
        if(!validateEntry(groupName)) dispatch(showModal(false, 'Invalid Input'))
        else {
            dispatch(requestStart())
            const data = await fetch(`${BASE_URL}/groups/add?id=${userId}&name=${groupName}`, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => response.json()).catch(err => console.log(err))

            let success = data?.message ? false : true
            let message = data?.message ? data.message : data.data
            
            return batch(() => {
                    dispatch(showModal(success, message))
                    dispatch(requestComplete())
            })
        }
    }
}

export const joinGroup = (userId, token, groupName) => {
    return async dispatch => {
        dispatch(requestStart())
        const data = await fetch(`${BASE_URL}/groups/join?id=${userId}&name=${groupName}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json()).catch(err => console.log(err))

        let success = data?.message ? false : true
        let message = data?.message ? data.message : data.data
        return batch(() => {
            dispatch(showModal(success, message))
            dispatch(requestComplete())
        })
    }
}

export const leaveGroup = (groupId, userId, token) => {
    return async dispatch => {
        dispatch(requestStart())
        const data = await fetch(`${BASE_URL}/groups/leave?groupId=${groupId}&userId=${userId}`, {
            method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => response.json()).catch(err => console.log(err))

        let success = data?.message ? false : true
        let message = data?.message ? data.message : data.data
        return batch(() => {
            dispatch(showModal(success, message))
            dispatch(requestStart())
        })
    }
}