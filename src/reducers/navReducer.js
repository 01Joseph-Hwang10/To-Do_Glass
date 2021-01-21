import { NOT_ON_LANDING, ON_LANDING } from "../actions/types";


const initialState = {
    onLanding:false
}

// eslint-disable-next-line
export default function(state=initialState,action) {
    switch (action.type) {
        case ON_LANDING:
            return {
                ...state,
                onLanding:action.payload
            };
        case NOT_ON_LANDING:
            return {
                ...state,
                onLanding:action.payload
            };
        default:
            return state;
    }
}
