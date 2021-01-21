import { NOT_ON_LANDING, ON_LANDING } from "./types";


export const checkLanding = () => dispatch => {
    const nav = document.getElementById("navigation")
    if (window.location.hash.length <= 2) {
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
