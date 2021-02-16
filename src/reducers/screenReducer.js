import { 
    FOCUS_PINBOARD, 
    FULL_SCREEN, 
    LOGOUT, 
    NOT_FULL_SCREEN, 
    ON_LANDING, 
    OPEN_GLANCE, 
    OPEN_OVERVIEW, 
    SCROLL_BUTTON_VISIBLE, 
    SCROLL_BUTTON_INVISIBLE,
    SET_SCREEN_SIZE 
} from "../actions/types"

const initialState = {
    isFullScreen:false,
    screenSize:Number(),
    overviewOpened:false,
    glanceOpened:false,
    scrollButtonVisible:false
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
        case SCROLL_BUTTON_VISIBLE:
            return {
                ...state,
                scrollButtonVisible:true
            }
        case SCROLL_BUTTON_INVISIBLE:
            return {
                ...state,
                scrollButtonVisible:false
            }
        case LOGOUT:
            return {
                ...state,
                isFullScreen:false,
                overviewOpened:false,
                glanceOpened:false
            }
        case ON_LANDING:
            return {
                ...state,
                isFullScreen:false,
                overviewOpened:false,
                glanceOpened:false
            }
        default:
            return state
    }
}
