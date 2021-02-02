import axios from "axios"
import { URL_GLANCE } from "../../store/variables"
import { CLEAR_GLANCE, GET_GLANCE } from "../types"


export const getGlance = () => dispatch => {
    axios
    .get(URL_GLANCE,{withCredentials:true})
    .then(response => {
        dispatch({
            type:GET_GLANCE,
            payload:response.data
        })
    })
}

export const clearGlance = () => dispatch => {
    dispatch({
        type:CLEAR_GLANCE
    })
}