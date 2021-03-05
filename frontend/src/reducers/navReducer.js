import { NOT_ON_LANDING, ON_LANDING, SET_NAV_HEIGHT } from "../actions/types";


const initialState = {
    onLanding:false,
    navHeight:'4rem',
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
        case SET_NAV_HEIGHT:
            return {
                ...state,
                navHeight:action.payload
            }
        default:
            return state;
    }
}
