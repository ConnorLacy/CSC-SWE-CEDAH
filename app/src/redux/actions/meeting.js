import {ADD_POSSIBLE_MEETINGS, SHOW_MODAL} from './types';

// const BASE_URL = "https://semiotic-karma-248216.ue.r.appspot.com"
const BASE_URL = "http://127.0.0.1:8080"

const showModal = (success, message) => ({
    type: SHOW_MODAL,
    payload: {success: success, message: message}
})

const addPossibleMeetings = (id, data) => ({
    type: ADD_POSSIBLE_MEETINGS,
    id,
    data
})
export const createMeeting = (formData, token) => {
    return async dispatch => {
        const data = await fetch(`${BASE_URL}/engine/create/meeting`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        }).then(d => d.json()).catch(err => console.log('Error: ', err))

        if(data?.message){
            return dispatch(showModal(false, data.message))
        }
        return dispatch(showModal(true, data.data))
    }
}

export const getPossibleMeetings = (groupId, token) => {
    return async dispatch => {
        const response = await fetch(`https://semiotic-karma-248216.ue.r.appspot.com/engine/predict?id=${groupId}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json()).catch(err => console.log(err))

        if(response?.message) {
            console.log('Something went wrong')
            return
        }

        return dispatch(addPossibleMeetings(groupId, response.data))
    }
}

export const vote = (meetingId, token) => {
    return async dispatch => {
        const response = await fetch(`${BASE_URL}/engine/vote?meetingId=${meetingId}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(d => d.json()).catch(err=> console.log(err))
        if(response?.message){
            console.log(response.message);
        }
    }
}

