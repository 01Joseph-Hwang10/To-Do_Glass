import axios from 'axios';
import json_cookie from '../store/cookie';
import { PROFILE_MINE, PROFILE_NOT_MINE } from './types';


// Not Authenticated

// Authenticated

export const getProfile = () => dispatch => {
    try {
        let user_id,access_token;
        if(json_cookie && json_cookie.access_token.length > 0) {
            user_id = json_cookie.user_id
            access_token = json_cookie.access_token
        }
        if(window.location.hash.replace(/\D/g,'')) {
            user_id = window.location.hash.replace(/\D/g,'');
            axios
            .get(`/api/users-api/public_users/${user_id}/`)
            .then(response => dispatch({
                type:PROFILE_NOT_MINE,
                payload:{
                    Profile:response,
                    isMyProfile:false,
                    isLoading:false
                }
            }))
            .catch(error=>console.error(error))
        } 
        if (json_cookie && json_cookie.user_id.length > 0 && json_cookie.access_token.length > 0) {
            const config = {
                headers: {
                    Authorization: `Token ${access_token}`
                }
            }
            axios
            .get(`/api/users-api/users/${user_id}/`,config)
            .then(response => {
                if(response.status === 200){
                    dispatch({
                        type:PROFILE_MINE,
                        payload:{
                            Profile:response,
                            isMyProfile:true,
                            isLoading:false
                        }
                    })
                }
            })
            .catch(error => console.error(error))
        }
        } catch (error) {
            console.log(4)
            console.error(error);
            alert("something went wrong")
        }
    }


export const deleteProfileAfterLogout = () => dispatch => {
    dispatch({
        type:PROFILE_NOT_MINE,
        payload:{
            Profile:[],
            isMyProfile:false
        }
    })
}
