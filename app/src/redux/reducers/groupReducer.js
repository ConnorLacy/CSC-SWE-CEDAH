import {
    SET_GROUPS,
    LOGOUT_USER
} from '../actions/types';

const initialState = {
    groups: null,
}

export default function groupReducer(state = initialState, action){
    switch(action.type){
        case SET_GROUPS:
            return {
                ...state,
                groups: action.payload
            }
        case LOGOUT_USER:
            return {
                ...initialState
            }
        default: 
            return state;
    }
}