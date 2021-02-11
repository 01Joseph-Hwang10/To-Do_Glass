import { 
    CLEAR_PROFILE, 
    GET_PROFILE, 
    GET_USER_INFO, 
    PROFILE_MINE, 
    PROFILE_NOT_MINE, 
    UPDATE_FOLLOW, 
    UPDATE_FOLLOWING_INFO, 
    UPDATE_PROFILE 
} from "../../actions/types";


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
        case UPDATE_PROFILE:
            return {
                ...state
            }
        case UPDATE_FOLLOWING_INFO:{
            const {id,bool} = action.payload
            let profile = state.Profile
            if(bool) {
                profile.data.following.push(id)
            } else {
                profile.data.following.splice(profile.data.following.indexOf(id),1)
            }
            return {
                ...state,
                Profile:profile
            }
        }
        case UPDATE_FOLLOW: {
            const profile = state.Profile
            const payload = action.payload
            if(payload.isFollowing) profile.data.following.push(payload.following)
            if(!payload.isFollowing) {
                const index = profile.data.following.indexOf(payload.following)
                profile.data.following.splice(index,1)
            }
            return {
                ...state,
                Profile:profile
            }
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