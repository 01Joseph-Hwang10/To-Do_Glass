import { LOGIN, LOGOUT } from "../../actions/types";

const initialState = {
    isAuthenticated:false
};

// eslint-disable-next-line
export default function(state=initialState,action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated:action.payload
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated:action.payload
            }
        default:
            return state;
    }
}