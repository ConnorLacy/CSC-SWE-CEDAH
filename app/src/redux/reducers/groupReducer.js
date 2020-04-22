const initialState = {
    groups: null,
}

export default function groupReducer(state = initialState, action){
    switch(action.type){
        case 'FETCH_GROUPS':
            return {
                ...state,
                groups: action.payload
            }
        default: 
            return state;
    }
}