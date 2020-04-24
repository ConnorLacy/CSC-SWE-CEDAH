import {CLOSE_MODAL} from './types'

export const hideModal = () => {
    return dispatch => {
        dispatch(closeModal())
    }
}

const closeModal = () => ({
    type: CLOSE_MODAL,
})