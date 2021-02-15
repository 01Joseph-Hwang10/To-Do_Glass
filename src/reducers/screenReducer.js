import { 
    FOCUS_PINBOARD, 
    FULL_SCREEN, 
    NOT_FULL_SCREEN, 
    OPEN_GLANCE, 
    OPEN_OVERVIEW, 
    SET_SCREEN_SIZE 
} from "../actions/types"

const initialState = {
    isFullScreen:false,
    screenSize:Number(),
    overviewOpened:false,
    glanceOpened:false
}

// eslint-disable-next-line
export default function(state=initialState, action) {
    switch (action.type) {
        case FULL_SCREEN:
            return {
                ...state,
                isFullScreen:true
            }
        case NOT_FULL_SCREEN:
            return {
                ...state,
                isFullScreen:false
            }
        case SET_SCREEN_SIZE:
            return {
                ...state,
                screenSize:action.payload
            }
        case OPEN_OVERVIEW:
            return {
                ...state,
                overviewOpened:true,
                glanceOpened:false
            }
        case OPEN_GLANCE:
            return {
                ...state,
                overviewOpened:false,
                glanceOpened:true
            }
        case FOCUS_PINBOARD:
            return {
                ...state,
                overviewOpened:false,
                glanceOpened:false
            }
        default:
            return state
    }
}
