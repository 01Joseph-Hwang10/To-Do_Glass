import axios from "axios";
import { URL_CHECK_SELF_AUTH, URL_LOGOUT, URL_SIGN_UP, URL_TOKEN, URL_TOKEN_REFRESH } from "../../store/variables";
import { CLEAR_PROFILE, LOGIN, LOGOUT, PROFILE_MINE, NOT_ON_LANDING, SIGN_UP, CLEAR_PROJECT, ON_LANDING } from "../types";


export const postSignUp = (post_data) => dispatch => {
    try {
        axios
        .post(URL_SIGN_UP,post_data)
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
        let response = axios
        .post(URL_TOKEN,post_data,{withCredentials:true})
        .then(response => {
            if(Number(response.status) === 401) window.alert("Authorization Failed")
            if(Number(response.status) === 200) {
                const user_id = response.data.user_id;
                if(!window.localStorage.getItem('user_id')) {
                    window.localStorage.setItem('user_id',user_id)
                }
                dispatch({
                    type:LOGIN,
                    payload:true
                        });
                window.location.href="/#/";
                // window.location.reload()
            } 
            return response.status
                });
                return Number(response)
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
        type:CLEAR_PROJECT,
        payload:[]
    })
    dispatch({
        type:LOGOUT,
        payload:false
    })
    dispatch({
        type:ON_LANDING,
        payload:true
    })
}


export const Logout = () => dispatch => {
    try {
        axios
        .get(URL_LOGOUT,{withCredentials:true})
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


// export const refresh = () => {

//     const user_id = window.localStorage.getItem('user_id')

//     axios
//     .post(URL_TOKEN_REFRESH,{user_id:user_id},{withCredentials:true})
// }


export const checkAuth = (isAuthenticated) => dispatch => {
    
    const user_id = window.localStorage.getItem('user_id')
    
    const permission_denied = dispatch => {
        axios
        .get(URL_LOGOUT,{withCredentials:true})
        .then(() => {
            window.localStorage.removeItem('user_id')
            userNotAuthenticatedDispatchSet(dispatch);
            const nav = document.getElementById("navigation")
            nav.style.display = "none";
            window.location.href = "/#/login";
        })
    }

        const check_self_auth = (dispatch) => {
            axios
            .post(URL_CHECK_SELF_AUTH,{user_id:user_id},{withCredentials:true})
            .then(response => {
                if(response.status===200) {
                    userAuthenticatedDispatchSet(dispatch)
                    const nav = document.getElementById("navigation")
                    nav.style.display = "block";
                    dispatch({
                        type:NOT_ON_LANDING,
                        payload:false
                    })
                }
            })
            .catch(error => {
                console.error(error)
                alert("Authentication Error")
                permission_denied(dispatch);
            })
        }

        const token_refresh = (dispatch) => {
            axios
            .post(URL_TOKEN_REFRESH,{user_id:user_id},{withCredentials:true})
            .then(response => {
                if(response.status === 200){
                    check_self_auth(dispatch);
                }
            })
            .catch(error => {
                console.error(error)
                alert("Authentication Error")
                permission_denied(dispatch)
            })
        }


        if(isAuthenticated) {
            if(user_id){
                token_refresh(dispatch);
            } else {
                permission_denied(dispatch)
            }
        }
    }
