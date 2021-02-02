import { FULL_SCREEN, NOT_FULL_SCREEN } from "./types"


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
