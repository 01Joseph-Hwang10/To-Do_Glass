import axios from "axios"
import { URL_PUBLIC_CONTAINER } from "../store/variables"
import { CLEAR_CONTAINER, GET_CONTAINER } from "./types"


export const getContainer = (id) => dispatch => {
    axios
    .get([URL_PUBLIC_CONTAINER,id,'/'].join(''),{withCredentials:true})
    .then(response => {
        dispatch({
            type:GET_CONTAINER,
            payload:{
                containerId:response.data.id,
                container:response.data
            }
        })
    })
    }

export const clearContainer = () => dispatch => {
    dispatch({
        type:CLEAR_CONTAINER
    })
}