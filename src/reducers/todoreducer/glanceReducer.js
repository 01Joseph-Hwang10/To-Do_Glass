import { GET_GLANCE ,CLEAR_GLANCE } from '../../actions/types';


const initialState = {
    Glance:[],
    isLoading:false
}

// eslint-disable-next-line
export default function(state=initialState,action) {
    switch (action.type) {
        case GET_GLANCE:
            return {
                ...state,
                Glance:action.payload,
                isLoading:false
            }
        case CLEAR_GLANCE:
            return {
                ...state,
                Glance:[],
                isLoading:true
            }
        default:
            return state
    }
}