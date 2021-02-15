import { 
    CLEAR_PROJECT, 
    CREATE_CONTAINER, 
    CREATE_PROJECT, 
    DELETE_CONTAINER, 
    DELETE_PROJECT, 
    GET_PROJECT, 
    UPDATE_PROJECT,
    UPDATE_PROJECT_DESCRIPTION
} from "../../actions/types";


const initialState = {
    Project:{}
}

// eslint-disable-next-line
export default function(state=initialState,action) {
    switch (action.type) {
        case GET_PROJECT:
            return {
                ...state,
                Project:action.payload
            }
        case CLEAR_PROJECT:
            return {
                ...state,
                Project:action.payload
            }
        case UPDATE_PROJECT:
            return {
                ...state,
                Project:action.payload
            }
        case CREATE_CONTAINER:{
            const data = action.payload
            let project = state.Project
            project.get_containers.push(data)
            return {
                ...state,
                Project:project
            }
        }
        case DELETE_CONTAINER:{
            const id = action.payload
            let project = state.Project
            for(let i=0; i<project.get_containers.length; i++) {
                if(Number(project.get_containers[i].id)===Number(id)) {
                    project.get_containers.splice(i,1)
                }
            }
            return {
                ...state,
                Project:project
            }
        }
        case CREATE_PROJECT:
            return {
                ...state
            }
        case DELETE_PROJECT:
            return {
                ...state,
                Project:{}
            }
        case UPDATE_PROJECT_DESCRIPTION: {
            let project = state.Project
            project.description = action.payload
            return {
                ...state,
                Project:project
            }
        }
        default:
            return state;
    }
}