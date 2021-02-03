import axios from "axios"
import { URL_TASK } from "../../store/variables"
import { CREATE_TASK, DELETE_TASK, UPDATE_TASK } from "../types"


export const updateTask = (post_data,id) => async dispatch => {
    await axios
    .patch([URL_TASK,id,'/'].join(''),post_data,{withCredentials:true})
    .then(response => {
        dispatch({
            type:UPDATE_TASK
        })
    })
}

export const createTask = (post_data) => async dispatch => {
    await axios
    .post(URL_TASK,post_data,{withCredentials:true})
    .then(response => {
        dispatch({
            type:CREATE_TASK
        })
    })
}

export const deleteTask = (id) => async dispatch => {
    await axios
    .delete([URL_TASK,id,'/'].join(''),{withCredentials:true})
    .then(response => {
        dispatch({
            type:DELETE_TASK
        })
    })
}