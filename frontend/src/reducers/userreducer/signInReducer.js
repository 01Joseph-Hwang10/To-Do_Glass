import { LOGIN, LOGIN_FAILED, LOGOUT } from "../../actions/types";

const initialState = {
    isAuthenticated:false,
    loginSuccessful:true
};

// eslint-disable-next-line
export default function(state=initialState,action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated:action.payload,
                loginSuccessful:true
            }
        case LOGIN_FAILED:
            return {
                ...state,
                loginSuccessful:false
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated:action.payload,
                loginSuccessful:true
            }
        default:
            return state;
    }
}