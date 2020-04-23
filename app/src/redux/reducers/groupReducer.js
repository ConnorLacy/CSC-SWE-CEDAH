const initialState = {
    groups: [],
}

export default function groupReducer(state = initialState, action){
    switch(action.type){
        case 'FETCH_GROUPS':
            return {
                ...state,
                groups: action.payload
            }
        case 'LOGOUT_USER':
            return {
                initialState
            }
        default: 
            return state;
    }
}