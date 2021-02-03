import axios from 'axios';
import { URL_PUBLIC_PROFILE } from '../../store/variables';
import { GET_PROFILE, CLEAR_PROFILE, PROFILE_MINE, PROFILE_NOT_MINE, GET_USER_INFO } from '../types';


// Not Authenticated

// Authenticated

export const isMyProfile = () => dispatch => {
    dispatch({
        type:PROFILE_MINE,
        payload:{
            isMyProfile:true
        }
    })
}

export const notMyProfile = () => dispatch => {
    dispatch({
        type:PROFILE_NOT_MINE,
        payload:{
            isMyProfile:false
        }
    })
}


export const getProfile = (user_id) => dispatch => {
    axios
    .get([URL_PUBLIC_PROFILE,user_id,'/'].join(''),{withCredentials:true})
    .then(response => dispatch({
        type:GET_PROFILE,
        payload:{
            Profile:response,
        }
    }))
    .catch(error=>console.error(error))
}

export const getUserInfo = (user_id) => dispatch => {
    axios
    .get([URL_PUBLIC_PROFILE,user_id,'/'].join(''),{withCredentials:true})
    .then(response => dispatch({
        type:GET_USER_INFO,
        payload:{
            UserInfo:response,
        }
    }))
    .catch(error=>console.error(error))
}


export const deleteProfileAfterLogout = () => dispatch => {
    dispatch({
        type:CLEAR_PROFILE,
        payload:{
            Profile:[],
            UserInfo:[],
            isMyProfile:false
        }
    })
}
