const BASE_URL = "https://semiotic-karma-248216.ue.r.appspot.com"

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
            return dispatch(showModal('SHOW_MODAL', false, data.message))
        }
        return dispatch(showModal('SHOW_MODAL', true, data.data))
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

const showModal = (type, success, message) => ({
    type: type,
    payload: {success: success, message: message}
})