import { 
    CLEAR_FOLLOWER_INFO, 
    CLEAR_FOLLOWING_INFO, 
    GET_FOLLOWER_INFO, 
    GET_FOLLOWING_INFO, 
    UPDATE_FOLLOWING_INFO 
} from "../../actions/types"


const initialState = {
    followers:[],
    followings:[],
}

// eslint-disable-next-line
export default function(state=initialState,action) {
    switch (action.type) {
        case GET_FOLLOWING_INFO: {
            const user = action.payload
            let followings = state.followings
            if(!followings.includes(user)) followings.push(user)
            return {
                ...state,
                followings:followings
            }
        }
        case GET_FOLLOWER_INFO: {
            const user = action.payload
            let followers = state.followers
            if(!followers.includes(user)) followers.push(user)
            return {
                ...state,
                followers:followers
            }
        }
        case UPDATE_FOLLOWING_INFO: {
            const {id,bool} = action.payload
            const followers = state.followers
            let followings = state.followings
            let following;
            for (let i=0; i<followers.length;i++){
                const userId = followers[i].url.split('/').filter(Boolean).reverse()[0]
                if(Number(id)===Number(userId)) following = followers[i]
            }
            if(bool && following) {
                followings.push(following)
            }
            return {
                ...state,
                followings:followings
            }
        }
        case CLEAR_FOLLOWING_INFO: 
            return {
                ...state,
                followings:[]
            }
        case CLEAR_FOLLOWER_INFO:
            return {
                ...state,
                followers:[]
            }
        default:
            return state
    }
}