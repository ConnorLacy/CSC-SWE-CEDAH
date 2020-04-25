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

const showModal = (type, success, message) => ({
    type: type,
    payload: {success: success, message: message}
})