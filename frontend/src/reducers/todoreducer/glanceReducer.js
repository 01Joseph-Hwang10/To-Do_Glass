import { GET_GLANCE ,CLEAR_GLANCE } from '../../actions/types';


const initialState = {
    Glance:[],
    isLoading:false,
    keyword:[],
    searchedId:[]
}

// eslint-disable-next-line
export default function(state=initialState,action) {
    switch (action.type) {
        case GET_GLANCE:{
            let glance=state.Glance
            let newGlance = glance.concat(action.payload.data)
            let finalGlance = Array.from(new Set(newGlance))
            let keyword = state.keyword
            let newKeyword, finalArray
            if(action.payload.keyword) {
                newKeyword = keyword.concat(action.payload.keyword.split(' '))
                finalArray = Array.from(new Set(newKeyword))
            } else {
                finalArray = keyword
            }
            let searchedId = state.searchedId
            let newSearchedId = action.payload.searchedId
            let finalSearchedId = Array.from(new Set(searchedId.concat(newSearchedId)))
            return {
                ...state,
                Glance:finalGlance,
                isLoading:false,
                keyword:finalArray,
                searchedId:finalSearchedId
            }
        }

        case CLEAR_GLANCE:
            return {
                ...state,
                Glance:[],
                isLoading:true,
                keyword:[],
                searchedId:[]
            }
        default:
            return state
    }
}