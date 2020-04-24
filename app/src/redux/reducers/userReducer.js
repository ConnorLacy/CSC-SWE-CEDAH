import {
    LOGIN_USER,
    LOGIN_ERROR,
    LOGOUT_USER,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR,
    LOAD_PROFILE
} from '../actions/types';

const initialState = {
    profile: null,
    username: null,
    isAuthenticated: false,
    loginError: null,
    registrationSuccess: false,
    registrationError: null
}

const startState = {
    ...initialState,
    token: localStorage.getItem('token')
}

export default function userReducer(state = startState, action){
    switch(action.type){
        case LOGIN_USER:
            return {
                ...state, 
                username: action.payload.user,
                token: action.payload.token,
                isAuthenticated: action.payload.isAuthenticated
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loginError: action.payload
            }
        case LOGOUT_USER:
            return {
                ...initialState
            }
        case REGISTRATION_SUCCESS:
            return {
                ...state,
                registrationSuccess: true
            }
        case REGISTRATION_ERROR:
            return {
                ...state,
                registrationError: action.payload
            }
        case LOAD_PROFILE:
            return {
                ...state,
                profile: action.payload 
            }
        default:
            return state;
    }
}