import { CLEAR_CONTAINER, CREATE_CONTAINER, DELETE_CONTAINER, GET_CONTAINER, PUSH_CONTAINER, UPDATE_CONTAINER, UPDATE_IMPORTANCE } from "../../actions/types";


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
        case UPDATE_IMPORTANCE:{
            const id =action.payload
            const currentState = state[id].importance
            let data = state[id]
            data.importance = !currentState
            return {
                ...state,
                [id]:data
            }
        }
        case CREATE_CONTAINER: {
            const id = action.payload.id
            const data = action.payload
            return {
                ...state,
                created:action.payload,
                [id]:data
            }
        }
        case PUSH_CONTAINER: {
            const id = action.payload.id
            const data = action.payload.data
            return {
                ...state,
                [id]:data
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