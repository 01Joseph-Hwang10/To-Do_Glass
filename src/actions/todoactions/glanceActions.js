import axios from "axios"
import { URL_GLANCE } from "../../store/variables"
import { CLEAR_GLANCE, GET_GLANCE } from "../types"


export const getGlance = () => async dispatch => {
    await axios
    .get(URL_GLANCE,{withCredentials:true})
    .then(response => {
        dispatch({
            type:GET_GLANCE,
            payload:response.data
        })
    })
}

export const searchGlance = (postData) => async dispatch => {
    await axios
    .patch(URL_GLANCE,postData,{withCredentials:true})
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