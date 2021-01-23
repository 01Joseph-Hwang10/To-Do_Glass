import axios from "axios";
import { LOGIN, LOGOUT, SIGN_UP } from "./types";


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



export const Logout = () => dispatch => {
    try {
        axios
        .get('/api/users-api/logout/',{withCredentials:true})
        .then(response => {
            if(response.status===200){
                window.localStorage.removeItem('user_id')
                dispatch({
                    type:LOGOUT,
                    payload:false
                });
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
    try {
        const user_id = window.localStorage.getItem('user_id')
        
    } catch (error) {
        console.error(error);
        alert("Authentication Error")
    }
}
