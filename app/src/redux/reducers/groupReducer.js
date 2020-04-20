const initialState = {
    groupList: null,
    members: null,
    meetings: null
}

export default function groupReducer(state = initialState, action){
    switch(action.type){
        case 'FETCH_GROUPS':
            return {
                ...state,
                groupList: action.payload
            }
        case 'FETCH_DETAILS': 
            console.log('Fetch member reducer')
            return {
                ...state,
                members: action.payload.members,
                meetings: action.payload.meetings
            }
        default: 
            return state;
    }
}