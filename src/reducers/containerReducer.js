import { CLEAR_CONTAINER, CREATE_CONTAINER, DELETE_CONTAINER, GET_CONTAINER, UPDATE_CONTAINER } from "../actions/types";


const initialState = {
    created:Number()
};

// eslint-disable-next-line
export default function(state=initialState, action) {
    switch(action.type) {
        case GET_CONTAINER: {
            const containerId = action.payload.containerId
            const container = action.payload.container
            return {
                ...state,
                [containerId]:container,
                created:Number()
            }
        }
        case UPDATE_CONTAINER: {
            const containerId = action.payload.containerId
            const container = action.payload.container
            return {
                ...state,
                [containerId]:container
            }
        }
        case CREATE_CONTAINER: {
            return {
                ...state,
                created:action.payload
            }
        }
        case DELETE_CONTAINER: {
            delete state[action.payload]
            return {
                ...state
            }
        }
        case CLEAR_CONTAINER:
            return {}
        default:
            return state
    }
}