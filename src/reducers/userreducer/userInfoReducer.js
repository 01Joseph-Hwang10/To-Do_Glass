import { CLEAR_PROFILE, GET_PROFILE, GET_USER_INFO, PROFILE_MINE, PROFILE_NOT_MINE } from "../../actions/types";

const initialState = {
    Profile:[],
    Storage:[],
    isMyProfile:false,
};

// eslint-disable-next-line
export default function(state=initialState,action) {
    switch (action.type) {
        case PROFILE_MINE:
            return {
                ...state,
                isMyProfile:action.payload.isMyProfile,
            }
        case PROFILE_NOT_MINE:
            return {
                ...state,
                isMyProfile:action.payload.isMyProfile,
            }
        case GET_PROFILE:
            return {
                ...state,
                Profile:action.payload.Profile,
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                Profile:action.payload.Profile,
                UserInfo:action.payload.UserInfo,
                isMyProfile:action.payload.isMyProfile,
            }
        case GET_USER_INFO:
            return {
                ...state,
                Storage:action.payload.UserInfo
            }
        default:
            return state;
    }
}