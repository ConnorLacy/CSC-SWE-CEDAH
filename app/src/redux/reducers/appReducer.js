import {SHOW_MODAL, CLOSE_MODAL} from '../actions/types';

const initialState = {
    showModal: false,
    success: true,
    message: null
}

export const appReducer = (state=initialState, action) => {
    switch(action.type){
        case CLOSE_MODAL: 
            return {
                initialState
            }
        case SHOW_MODAL:
            return {
                ...state,
                showModal: true,
                success: action.payload.success,
                message: action.payload.message
            }
        default: 
            return {
                ...state
            };
    }
}
