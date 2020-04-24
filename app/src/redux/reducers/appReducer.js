import {
    SHOW_MODAL, 
    CLOSE_MODAL, 
    REQUEST_START,
    REQUEST_COMPLETE
} from '../actions/types';

const initialState = {
    showModal: false,
    success: true,
    message: null,
    isFetching: false,
}

export const appReducer = (state=initialState, action) => {
    switch(action.type){
        case CLOSE_MODAL: 
            return {
                ...initialState
            }
        case SHOW_MODAL:
            return {
                ...state,
                showModal: true,
                success: action.payload.success,
                message: action.payload.message
            }
        case REQUEST_START: 
            return {
                ...state,
                isFetching: true
            }
        case REQUEST_COMPLETE:
            return {
                ...state,
                isFetching: false
            }
        default: 
            return {
                ...state
            };
    }
}
