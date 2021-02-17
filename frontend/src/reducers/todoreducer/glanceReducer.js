import { GET_GLANCE ,CLEAR_GLANCE } from '../../actions/types';


const initialState = {
    Glance:[],
    isLoading:false,
    keyword:"",
    searchContinue:0
}

// eslint-disable-next-line
export default function(state=initialState,action) {
    switch (action.type) {
        case GET_GLANCE:{
            let glance=state.Glance
            let newGlance = glance.concat(action.payload.data)
            return {
                ...state,
                Glance:newGlance,
                isLoading:false,
                keyword:action.payload.keyword,
                searchContinue:action.payload.searchContinue
            }
        }

        case CLEAR_GLANCE:
            return {
                ...state,
                Glance:[],
                isLoading:true,
                keyword:"",
                searchContinue:0
            }
        default:
            return state
    }
}