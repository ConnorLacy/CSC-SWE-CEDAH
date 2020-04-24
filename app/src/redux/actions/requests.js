import {
    REQUEST_START,
    REQUEST_COMPLETE
} from './types';

export const requestStart = () => ({
    type: REQUEST_START
})
export const requestComplete = () => ({
    type: REQUEST_COMPLETE
})