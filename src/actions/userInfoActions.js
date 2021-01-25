import axios from 'axios';
import { URL_PUBLIC_PROFILE } from '../store/variables';
import { GET_PROFILE, CLEAR_PROFILE } from './types';


// Not Authenticated

// Authenticated

export const getProfile = () => dispatch => {
    // try {
        if(window.location.hash.replace(/\D/g,'')) {
                const user_id = window.location.hash.replace(/\D/g,'');
                axios
                .get([URL_PUBLIC_PROFILE,user_id,'/'].join(''),{withCredentials:true})
                .then(response => dispatch({
                    type:GET_PROFILE,
                    payload:{
                        Profile:response,
                        isLoading:false
                    }
                }))
                .catch(error=>console.error(error))
            }
        // } catch (error) {
        //     console.error(error);
        //     alert("Profile request error")
        // }
    }


export const deleteProfileAfterLogout = () => dispatch => {
    dispatch({
        type:CLEAR_PROFILE,
        payload:{
            Profile:[],
            isMyProfile:false
        }
    })
}
