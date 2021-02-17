import { CLEAR_TAG, CREATE_TAG, DELETE_TAG, GET_TAG, UPDATE_TAG } from "../../actions/types"


const initialState = {
    Tags:[]
}


// eslint-disable-next-line
export default function(state=initialState,action) {
    switch (action.type) {
        case GET_TAG:
            return {
                ...state,
                Tags:action.payload
            }
        case CREATE_TAG: {
            const tags = state.Tags
            tags.push(action.payload)
            return {
                ...state,
                Tags:tags
            }
        }
        case UPDATE_TAG:{
            const tags=state.Tags
            return {
                ...state,
                Tags:tags
            }
        }
        case DELETE_TAG: {
            const id = action.payload
            const tags = state.Tags
            const deletingObj = tags.indexOf(tags.find(element => element.id===id))
            tags.splice(deletingObj,1)
            return {
                ...state,
                Tags:tags
            }
        }
        case CLEAR_TAG:
            return {
                ...state,
                Tags:[]
            }
        default:
            return state
    }
}
