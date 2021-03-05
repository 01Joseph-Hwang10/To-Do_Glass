import axios from "axios"
import { URL_GLANCE } from "../../store/variables"
import { CLEAR_GLANCE, GET_GLANCE } from "../types"


export const getGlance = () => async dispatch => {
    await axios
    .get(URL_GLANCE,{withCredentials:true})
    .then(response => {
        let ids = [];
        for(let i=0; i<response.data.length; i++) {
            ids.push(response.data[i].id)
        }
        dispatch({
            type:GET_GLANCE,
            payload:{
                data:response.data,
                keyword:"",
                searchedId:ids
            }
        })
    })
}

export const searchGlance = (postData) => async dispatch => {
    const response = await axios
    .patch(URL_GLANCE,postData,{withCredentials:true})
    .then(response => {
        let ids = [];
        for(let i=0; i<response.data.length; i++) {
            ids.push(response.data[i].id)
        }
        dispatch({
            type:GET_GLANCE,
            payload:{
                data:response.data,
                keyword:postData.input,
                searchedId:ids
            }
        })
        return response.data.length
    })
    return Number(response)
}

export const clearGlance = () => dispatch => {
    dispatch({
        type:CLEAR_GLANCE
    })
}