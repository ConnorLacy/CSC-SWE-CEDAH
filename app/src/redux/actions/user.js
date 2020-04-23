const BASE_URL = "https://semiotic-karma-248216.ue.r.appspot.com/"

export const userLoginFetch = user => {
    console.log("Logging in...")
    return async dispatch => {
        return fetch(`${BASE_URL}/login` , {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if(data.message){
                console.log("Could not login: ", data.message)
                dispatch(loginError(data.message))
                setTimeout(() => {
                    dispatch(loginError(null))
                }, 3000);
            }
            else {
                console.log("Successful login. Token: ", data.jwt)
                console.log("user: ", data.user)
                dispatch(loginUser(data.user, data.jwt, true))
            }
        })
        .catch(err => console.log(err))
    }
}

export const getUserInfo = (username, token) => {
    console.log('Getting user info')
    return async dispatch => {
        return fetch(`${BASE_URL}/users/profile?username=${username}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('getuserinfo response: ', data)
            dispatch(loadProfile(data.user))
        })
        .catch(err => console.log(err))
    }
}

export const logOut = () => {
    console.log("actions.js | Logging out")
    localStorage.removeItem('state')
    return dispatch => {
        return dispatch(logoutUser())
    }
}

export const registerUser = (formData) => {
    console.log("Attempting registration");
    return dispatch => {
        return fetch(`${BASE_URL}/users/sign-up`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if(data.message){
                dispatch(registrationError(data.message))
                setTimeout(() => {
                    dispatch(registrationError(null))
                }, 3000);
            }
            else{
                dispatch(showModal(
                        'SHOW_MODAL', 
                        true, 
                        'You created an account successfully! Go ahead and log in to get started!'))
                dispatch(registrationSuccess(true))
            }
        })
        .catch(err => console.log(err))
    }
}

const showModal = (type, success, message) => ({
    type: type,
    payload: {success: success, message: message}
})

const registrationError = message => ({
    type: 'REGISTRATION_ERROR',
    payload: message
})

const registrationSuccess = status => ({
    type: 'REGISTRATION_SUCCESS',
    payload: status
})

const loginUser = (userObj, token, bool) => ({
    type: 'LOGIN_USER',
    payload: { user: userObj, token: token, isAuthenticated: bool }
})

const loginError = message => ({
    type: 'LOGIN_ERROR',
    payload: message
})

const logoutUser = () => ({
    type: 'LOGOUT_USER',
    payload: false
})

const loadProfile = (userProfile) => ({
    type: 'LOAD_PROFILE',
    payload: userProfile
})
