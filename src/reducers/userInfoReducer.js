import { PROFILE_MINE, PROFILE_NOT_MINE } from "../actions/types";

const initialState = {
    Profile:[],
    isMyProfile:false
};

// eslint-disable-next-line
export default function(state=initialState,action) {
    switch (action.type) {
        case PROFILE_MINE:
            return {
                ...state,
                Profile:action.payload.Profile,
                isMyProfile:action.payload.isMyProfile
            }
        case PROFILE_NOT_MINE:
            return {
                ...state,
                Profile:action.payload.Profile,
                isMyProfile:action.payload.isMyProfile
            }
        default:
            return state;
    }
}