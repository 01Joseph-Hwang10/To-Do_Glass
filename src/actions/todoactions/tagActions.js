import axios from "axios"
import { URL_TAG } from "../../store/variables"
import { CLEAR_TAG, CREATE_TAG, DELETE_TAG, GET_TAG, UPDATE_TAG } from "../types"


export const getTag = (tags) => dispatch => {
    dispatch({
        type:GET_TAG,
        payload:tags
    })
}

export const createTag = (postData) => async dispatch => {
    await axios
    .post(URL_TAG,postData,{withCredentials:true})
    .then(response => {
        if(Number(response.status) === 201) {
            dispatch({
                type:CREATE_TAG,
                payload:response.data
            })
        }
    })
}

export const updateTag = () => dispatch => {
    dispatch({
        type:UPDATE_TAG
    })
}

export const deleteTag = (id) => async dispatch => {
    await axios
    .delete([URL_TAG,id,'/'].join(''),{withCredentials:true})
    .then(response => {
        if(Number(response.status) === 204) {
            dispatch({
                type:DELETE_TAG,
                payload:id
            })
        }
    })
}


export const clearTag = () => dispatch => {
    dispatch({
        type:CLEAR_TAG
    })
}
