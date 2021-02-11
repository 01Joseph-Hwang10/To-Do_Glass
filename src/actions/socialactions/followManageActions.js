import axios from "axios"
import { URL_PUBLIC_PROFILE } from "../../store/variables"
import { 
    CLEAR_FOLLOWER_INFO, 
    CLEAR_FOLLOWING_INFO, 
    GET_FOLLOWER_INFO, 
    GET_FOLLOWING_INFO,
    UPDATE_FOLLOWER_INFO,
    UPDATE_FOLLOWING_INFO 
} from "../types"



export const getFollower = (id) => dispatch => {
    axios
    .get([URL_PUBLIC_PROFILE,id,'/'].join(''),{withCredentials:true})
    .then(response => {
        if(response.status === 200) {
            dispatch({
                type:GET_FOLLOWER_INFO,
                payload:response.data
            })
        }
    })
}


export const getFollowing = (id) => dispatch => {
    axios
    .get([URL_PUBLIC_PROFILE,id,'/'].join(''),{withCredentials:true})
    .then(response => {
        if(response.status === 200) {
            dispatch({
                type:GET_FOLLOWING_INFO,
                payload:response.data
            })
        }
    })
}

export const updateFollower = (id,bool) => dispatch => {
    dispatch({
        type:UPDATE_FOLLOWER_INFO,
        payload:{
            id,
            bool
        }
    })
}

export const updateFollowing = (id,bool) => dispatch => {
    dispatch({
        type:UPDATE_FOLLOWING_INFO,
        payload:{
            id,
            bool
        }
    })
}


export const clearFollower = () => dispatch => {
    dispatch({
        type:CLEAR_FOLLOWER_INFO
    })
}

export const clearFollowing = () => dispatch => {
    dispatch({
        type:CLEAR_FOLLOWING_INFO
    })
}