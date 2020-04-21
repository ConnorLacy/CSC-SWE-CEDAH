export const getMyGroups = (userId, token) => {
    return async dispatch => {
        return fetch(`/groups/retrieve?id=${userId}`, {
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

export const getDetails = (groupId, token) => {
    return async dispatch => {
        return fetch(`/groups/details?id=${groupId}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => 
            response.json()
        )
        .then(data => {
            if(data.data){
                console.log('Members: ', data.data)
                dispatch(setGroupDetails(data.data))
            }else{
                console.log("Oops!\n", data.message)
            }
        })
        .catch(err => console.log('Error: ', err))
    }
}

export const addGroup = (userId, token, groupName) => {
    return dispatch => {
        return fetch(`/groups/add?id=${userId}&name=${groupName}`, {
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

export const joinGroup = (userId, token, groupName) => {
    return dispatch => {
        return fetch(`/groups/join?id=${userId}&name=${groupName}`, {
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
                message = 'You are already a member of this group'
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
        return fetch(`/groups/leave?groupId=${groupId}&userId=${userId}`, {
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

const setGroupDetails = details => ({
    type: 'FETCH_DETAILS',
    payload: {
        members: details['members'],
        meetings: details['meetings']
    }
})

const showModal = (type, success, message) => ({
    type: type,
    payload: {success: success, message: message}
})