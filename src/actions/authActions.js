import axios from "axios";
import { CLEAR_PROFILE, LOGIN, LOGOUT, PROFILE_MINE, PROFILE_NOT_MINE, SIGN_UP } from "./types";


export const postSignUp = (post_data) => dispatch => {
    try {
        axios
        .post('/api/users-api/sign-up/',post_data)
        .then(response => {
            if(response.status===201) {
                dispatch({type:SIGN_UP});
                window.location.href="/#/login";
            } else {
                alert("Internal Server Error");
            }
                });
    } catch (error) {
        console.log(error);
        alert("Signup error");
    }
}



export const postLogin = (post_data) => dispatch => {
    try {
        axios
        .post('/api/users-api/token/',post_data,{withCredentials:true})
        .then(response => {
            if(response.status === 200) {
                const user_id = response.data.user_id;
                window.localStorage.setItem('user_id',user_id)
                dispatch({
                    type:LOGIN,
                    payload:true
                        });
                window.location.href="/#/";
                // window.location.reload()
            } else {
                alert("Login Failed!")
            }
                });
    } catch (error) {
        console.log(error);
        alert("Login error");
    }
}


const userAuthenticatedDispatchSet = dispatch => {
    dispatch({
        type:PROFILE_MINE,
        payload:{
            isMyProfile:true
        }
    })
    dispatch({
        type:LOGIN,
        payload:true
    })
}

const userNotAuthenticatedDispatchSet = dispatch => {
    dispatch({
        type:CLEAR_PROFILE,
        payload:{
            isMyProfile:false,
            Profile:[]
        }
    })
    dispatch({
        type:LOGOUT,
        payload:false
    })
}


export const Logout = () => dispatch => {
    try {
        axios
        .get('/api/users-api/logout/',{withCredentials:true})
        .then(response => {
            if(response.status===200){
                window.localStorage.removeItem('user_id')
                userNotAuthenticatedDispatchSet(dispatch)
                window.location.href = "/#/";
                window.location.reload();
            } else {
                alert("Logout failed")
            }
        })
    } catch (error) {
        console.error(error)
        alert("Logout error")
    }
}


export const checkAuth = () => dispatch => {
    
        const user_id = window.localStorage.getItem('user_id')
        if(user_id){
            axios
            .post('/api/users-api/token/refresh/',{user_id:user_id},{withCredentials:true})
            .then(response => {
                if(response.status === 200){
                    userAuthenticatedDispatchSet(dispatch)
                    return true;
                }
            })
            axios
            .post('/api/users-api/check-self-auth/',{user_id:user_id},{withCredentials:true})
            .then(response => {
                if(response.status === 200){
                    userAuthenticatedDispatchSet(dispatch)
                    return true;
                }
            })
        }
        userNotAuthenticatedDispatchSet(dispatch);
        window.location.href = "/#/";
        alert("Authentication Error")
        Logout();
        return false;
    }
