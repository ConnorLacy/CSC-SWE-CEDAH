import {
    LOGIN_USER,
    LOGIN_ERROR,
    LOGOUT_USER,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR,
    LOAD_PROFILE,
    SET_GROUPS,
    ADD_POSSIBLE_MEETINGS
} from '../actions/types';

const initialState = {
    profile: null,
    username: null,
    isAuthenticated: false,
    loginError: null,
    registrationSuccess: false,
    registrationError: null,
    groups: null
}

export default function userReducer(state = initialState, action){
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
        case SET_GROUPS:
            return {
                ...state,
                groups: action.payload
        }
        case LOGOUT_USER:
            return {
                ...initialState
            }
        case ADD_POSSIBLE_MEETINGS:
            return {
                ...state,
                groups: [...state.groups.map(group => {
                    if(group.id === action.id){
                        return {
                            ...group,
                            possible_meetings: [...action.data]
                        }
                    }
                    else{
                        return {...group}
                    }
                })]
            }
        default:
            return state;
    }
}