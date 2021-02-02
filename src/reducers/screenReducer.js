import { FULL_SCREEN, NOT_FULL_SCREEN } from "../actions/types"

const initialState = {
    isFullScreen:false
}

// eslint-disable-next-line
export default function(state=initialState, action) {
    switch (action.type) {
        case FULL_SCREEN:
            return {
                ...state,
                isFullScreen:true
            }
        case NOT_FULL_SCREEN:
            return {
                ...state,
                isFullScreen:false
            }
        default:
            return state
    }
}
