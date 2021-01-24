import { NOT_ON_LANDING, ON_LANDING } from "./types";


export const checkPlace = () => dispatch => {
    const nav = document.getElementById("navigation")
    const navNotAllowed = Boolean(
        window.location.hash === '#/' || window.location.hash === '#'
        || window.location.hash === '#/login' || window.location.hash ==='#/login/'
        || window.location.hash === '#/signup' || window.location.hash === '#/signup/')
    if (navNotAllowed) {
        nav.style.display = "none";
        dispatch({
            type:ON_LANDING,
            payload:true
        })
    } else {
        nav.style.display = "block";
        dispatch({
            type:NOT_ON_LANDING,
            payload:false
        })
    }
}


export const showNavAfterLogin = () => dispatch => {
    const nav = document.getElementById("navigation");
    nav.style.display = "block";
    dispatch({
        type:NOT_ON_LANDING,
        payload:false
    })
}

export const hideNavAfterLogout = () => dispatch => {
    const nav = document.getElementById("navigation");
    nav.style.display = "none";
    dispatch({
        type:ON_LANDING,
        payload:true
    })
}
