import { FOCUS_PINBOARD, FULL_SCREEN, NOT_FULL_SCREEN, OPEN_GLANCE, OPEN_OVERVIEW, SCROLL_BUTTON_INVISIBLE, SCROLL_BUTTON_VISIBLE, SET_SCREEN_SIZE } from "./types"


export const enableFullScreen = () => dispatch => {
    dispatch({
        type:FULL_SCREEN
    })
}

export const disableFullScreen = () => dispatch => {
    dispatch({
        type:NOT_FULL_SCREEN
    })
}

export const setScreenSize = (size) => dispatch => {
    dispatch({
        type:SET_SCREEN_SIZE,
        payload:Number(size)
    })
}

export const openOverview = () => dispatch => {
    dispatch({
        type:OPEN_OVERVIEW
    })
}

export const openGlance = () => dispatch => {
    dispatch({
        type:OPEN_GLANCE
    })
}

export const focusPinboard = () => dispatch => {
    dispatch({
        type:FOCUS_PINBOARD
    })
}

export const showScrollButton = () => dispatch => {
    dispatch({
        type:SCROLL_BUTTON_VISIBLE
    })
}

export const hideScrollButton = () => dispatch => {
    dispatch({
        type:SCROLL_BUTTON_INVISIBLE
    })
}
