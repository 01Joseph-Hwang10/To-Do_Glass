import axios from 'axios';
import { CLEAR_PROJECT, GET_PROJECT } from './types';


export const getProject = (project_id) => dispatch => {
    axios
    .get(`/api/todos-api/public_projects/${project_id}/`,{withCredentials:true})
    .then(response => {
        console.log(response.data)
        dispatch({
            type:GET_PROJECT,
            payload:response.data
        })
    })
}

export const clearProject = () => dispatch => {
    dispatch({
        type:CLEAR_PROJECT,
        payload:[]
    })
}

