import axios from "axios"
import { URL_CONTAINER, URL_PUBLIC_CONTAINER } from "../../store/variables"
import { CLEAR_CONTAINER, CREATE_CONTAINER, DELETE_CONTAINER, GET_CONTAINER, UPDATE_CONTAINER } from "../types"


export const getContainer = (id) => async dispatch => {
    await axios
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

export const createContainer = (post_data) => async dispatch => {
    let response = await axios
    .post(URL_CONTAINER,post_data,{withCredentials:true})
    .then(response => {
        dispatch({
            type:CREATE_CONTAINER,
            payload:response.data.id
        })
        return response.data.id
    })
    return response
}

export const deleteContainer = (id) => async dispatch => {
    // eslint-disable-next-line
    let response = await axios
    .delete([URL_CONTAINER,id,'/'].join(''),{withCredentials:true})
    .then(response => {
        dispatch({
            type:DELETE_CONTAINER,
            payload:id
        })
    })
}

export const updateContainer = (post_data,id) => async dispatch => {
    await axios
    .patch([URL_CONTAINER,id,'/'].join(''),post_data,{withCredentials:true})
    .then(response => {
        dispatch({
            type:UPDATE_CONTAINER,
            payload:{
                containerId:id,
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


