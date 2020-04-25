import {
    SET_GROUPS,
    LOGOUT_USER,
    ADD_POSSIBLE_MEETINGS
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
        case ADD_POSSIBLE_MEETINGS:
            // return state.groups.map(group => {
            //         if(group.id === action.id){
            //             return {
            //                 ...group,
            //                 'possibilities': action.data
            //             }
            //         }
            //         else{
            //             return {...group}
            //         }
            //     })
            
        default: 
            return state;
    }
}