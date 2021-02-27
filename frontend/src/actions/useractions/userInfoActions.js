import axios from 'axios';
import { URL_PUBLIC_PROFILE, URL_PROFILE } from '../../store/variables';
import { GET_PROFILE, CLEAR_PROFILE, PROFILE_MINE, PROFILE_NOT_MINE, GET_USER_INFO, UPDATE_PROFILE, LOADING } from '../types';


// Not Authenticated

// Authenticated

export const myProfile = () => dispatch => {
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


export const getProfile = (user_id) => async dispatch => {
    await axios
    .get([URL_PROFILE,user_id,'/'].join(''),{withCredentials:true})
    .then(response => dispatch({
        type:GET_PROFILE,
        payload:{
            Profile:response,
        }
    }))
    .catch(error=>console.error(error))
}

export const updateProfile = (post_data,user_id) => async dispatch => {
    if(post_data.avatar) {
        const formData = new FormData();
        const imagefile = post_data.avatar
        formData.append('avatar',imagefile)
        formData.append('first_name',post_data.first_name)
        if(post_data.bio) formData.append('bio',post_data.bio)
        formData.append('user_id',post_data.user_id)
        await axios
        .patch([URL_PROFILE,user_id,'/'].join(''),formData,{
            withCredentials:true,
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        .then(response => {
            dispatch({
                type:UPDATE_PROFILE
            })
        })
    } else {
        await axios
        .patch([URL_PROFILE,user_id,'/'].join(''),post_data,{withCredentials:true})
        .then(response => {
            dispatch({
                type:UPDATE_PROFILE
            })
        })
    }
}

export const getUserInfo = (user_id) => async dispatch => {
    await axios
    .get([URL_PUBLIC_PROFILE,user_id,'/'].join(''),{withCredentials:true})
    .then(response => dispatch({
        type:GET_USER_INFO,
        payload:{
            UserInfo:response,
        }
    }))
    .catch(error=>console.error(error))
}
export const loading = () => dispatch => {
    dispatch({
        type:LOADING
    })
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
