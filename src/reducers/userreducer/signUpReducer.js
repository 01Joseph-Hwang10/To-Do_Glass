import { SIGN_UP } from "../../actions/types";


// eslint-disable-next-line
export default function(state=[],action) {
    switch (action.type) {
        case SIGN_UP:
            return {
                ...state
            };
        default:
            return state;
    }
}