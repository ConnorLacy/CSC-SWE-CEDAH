const BASE_URL = "https://semiotic-karma-248216.ue.r.appspot.com"

export const createMeeting = (formData, token) => {
    return dispatch => {
        return fetch(`${BASE_URL}/engine/create/meeting`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if(data.data){
                console.log('success: ', data.data)
                dispatch(showModal('SHOW_MODAL', true, data.data))
            } else {
                console.log("error: ", data.message)
                dispatch(showModal('SHOW_MODAL', false, data.message))
            }
        }).catch(err => console.log('Error: ', err))
    }
}

const showModal = (type, success, message) => ({
    type: type,
    payload: {success: success, message: message}
})