import axios from 'axios';
import { URL_PROJECT, URL_PUBLIC_PROJECT } from '../../store/variables';
import { CLEAR_PROJECT, CREATE_PROJECT, DELETE_PROJECT, GET_PROJECT, UPDATE_PROJECT} from '../types';


export const getProject = (project_id) => async dispatch => {
    await axios
    .get([URL_PUBLIC_PROJECT,project_id,'/'].join(''),{withCredentials:true})
    .then(response => {
        dispatch({
            type:GET_PROJECT,
            payload:response.data
        })
    })
}

export const updateProject = (post_data, project_id) => async dispatch => {
    await axios
    .patch([URL_PROJECT,project_id,'/'].join(''),post_data,{withCredentials:true})
    .then(response => {
        dispatch({
            type:UPDATE_PROJECT,
            payload:response.data
        })
    })
}

export const createProject = (post_data) => async dispatch => {
    let response = await axios
    .post(URL_PROJECT,post_data,{withCredentials:true})
    .then(response => {
        dispatch({
            type:CREATE_PROJECT
        })
        console.log(response.data.id)
        return response.data.id
    })
    return response
}

export const deleteProject = (project_id) => async dispatch => {
    await axios
    .delete([URL_PROJECT,project_id,'/'].join(''),{withCredentials:true})
    .then(response => {
        dispatch({
            type:DELETE_PROJECT
        })
    })
}

// export const updateDescription = (post_data, project_id) => dispatch => {
//     axios
//     .patch([URL_PROJECT,project_id,'/'].join(''),post_data,{withCredentials:true})
//     .then(response => {
//         console.log(response.data)
//         dispatch({
//             type:UPDATE_PROJECT_DESCRIPTION,
//             payload:post_data.description
//         })
//     })
// }

// export const updateProjectName = (post_data, project_id) => dispatch => {
//     axios
//     .patch([URL_PROJECT,project_id,'/'].join(''),post_data,{withCredentials:true})
//     .then(response => {
//         dispatch({
//             type:UPDATE_PROJECT_NAME,
//             payload:response.data
//         })
//     })
// }


export const clearProject = () => dispatch => {
    dispatch({
        type:CLEAR_PROJECT,
        payload:[]
    })
}

