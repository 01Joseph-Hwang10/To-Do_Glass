import axios from "axios"
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
            document.cookie = ("user_id="+response.data.user_id+"; path=/;");
            document.cookie = ("access_token="+response.data.token+"; path=/;");
            dispatch({
                type:LOGIN,
                payload:true
                    });
            window.location.href="/#/";
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
}
