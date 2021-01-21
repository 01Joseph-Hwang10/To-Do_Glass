import axios from "axios"
import json_cookie from "../store/cookie";
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
        alert("Something went wrong");
    }
}



export const postLogin = (post_data) => dispatch => {
    try {
        axios
        .post('/api/users-api/api-token-auth/',post_data)
        .then(response => {
            if(response.status === 200) {
                document.cookie = ("user_id="+response.data.user_id+"; path=/;");
                document.cookie = ("access_token="+response.data.token+"; path=/;");
                dispatch({
                    type:LOGIN,
                    payload:true
                        });
                window.location.href="/#/";
                window.location.reload()
            } else {
                alert("Login Failed!")
            }
                });
    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
}



export const Logout = () => dispatch => {
    document.cookie = "user_id=; path=/;"
    document.cookie = "access_token=; path=/;";
    dispatch({
        type:LOGOUT,
        payload:false
    });
    window.location.href = "/#/"
    window.location.reload();
}


export const CleanUp = () => dispatch => {
    if(!document.cookie 
        || !json_cookie 
        || json_cookie.user_id.length===0 
        || json_cookie.access_token.length===0) {
            document.cookie = "user_id=; path=/;"
            document.cookie = "access_token=; path=/;";
            dispatch({
                type:LOGOUT,
                payload:false
            });
            window.location.href = "/#/"
        }
}
