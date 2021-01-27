import { CLEAR_PROJECT, GET_PROJECT, UPDATE_PROJECT } from "../actions/types";


const initialState = {
    Project:{}
}

// eslint-disable-next-line
export default function(state=initialState,action) {
    switch (action.type) {
        case GET_PROJECT:
            return {
                ...state,
                Project:action.payload
            }
        case CLEAR_PROJECT:
            return {
                ...state,
                Project:action.payload
            }
        case UPDATE_PROJECT:
            return {
                ...state,
                Project:action.payload
            }
        default:
            return state;
    }
}