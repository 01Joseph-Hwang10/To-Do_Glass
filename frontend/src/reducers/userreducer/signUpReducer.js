import { SIGN_UP, SIGN_UP_FAILED } from "../../actions/types";


const initialState = {
    signUpSuccessful:true
}


// eslint-disable-next-line
export default function(state=initialState,action) {
    switch (action.type) {
        case SIGN_UP:
            return {
                ...state,
                signUpSuccessful:true
            };
        case SIGN_UP_FAILED:
            return {
                ...state,
                signUpSuccessful:false
            }
        default:
            return state;
    }
}