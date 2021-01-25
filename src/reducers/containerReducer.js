import { GET_CONTAINER } from "../actions/types";


const initialState = {}

// eslint-disable-next-line
export default function(state=initialState, action) {
    switch(action.type) {
        case GET_CONTAINER:
            const containerId = action.payload.containerId
            const container = action.payload.container
            return {
                ...state,
                [containerId]:container
            }
        default:
            return state
    }
}