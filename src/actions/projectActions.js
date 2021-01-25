import axios from 'axios';
import { URL_PROJECT, URL_PUBLIC_PROJECT } from '../store/variables';
import { CLEAR_PROJECT, GET_PROJECT, UPDATE_PROJECT } from './types';


export const getProject = (project_id) => dispatch => {
    axios
    .get([URL_PUBLIC_PROJECT,project_id,'/'].join(''),{withCredentials:true})
    .then(response => {
        dispatch({
            type:GET_PROJECT,
            payload:response.data
        })
    })
}

export const updateProject = (post_data, project_id) => dispatch => {
    
    axios
    .patch([URL_PROJECT,project_id,'/'].join(''),post_data,{withCredentials:true})
    .then(response => {
        dispatch({
            type:UPDATE_PROJECT,
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

