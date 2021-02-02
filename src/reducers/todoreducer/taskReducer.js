import { CREATE_TASK, DELETE_TASK, UPDATE_TASK } from "../../actions/types"


const initialState = {}

// eslint-disable-next-line
export default function(state=initialState,action) {
    switch (action.type) {
        case UPDATE_TASK:
            return {
                ...state
            }
        case CREATE_TASK:
            return {
                ...state
            }
        case DELETE_TASK:
            return {
                ...state
            }
        default:
            return state
    }
}
