import { CLEAR_PROFILE, GET_PROFILE, PROFILE_MINE, PROFILE_NOT_MINE } from "../../actions/types";

const initialState = {
    Profile:[],
    isMyProfile:false,
    isLoading:true
};

// eslint-disable-next-line
export default function(state=initialState,action) {
    switch (action.type) {
        case PROFILE_MINE:
            return {
                ...state,
                isMyProfile:action.payload.isMyProfile,
                isLoading:false
            }
        case PROFILE_NOT_MINE:
            return {
                ...state,
                isMyProfile:action.payload.isMyProfile,
                isLoading:false
            }
        case GET_PROFILE:
            return {
                ...state,
                Profile:action.payload.Profile,
                isLoading:false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                Profile:action.payload.Profile,
                isMyProfile:action.payload.isMyProfile,
                isLoading:false
            }
        default:
            return state;
    }
}