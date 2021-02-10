import axios from "axios"
import { URL_PROFILE } from "../../store/variables"
import { UPDATE_FOLLOW } from "../types";


export const updateFollow = (postData,id) => dispatch => {
    axios
    .patch([URL_PROFILE,id,'/'].join(''),postData,{withCredentials:true})
    .then(response => {
        if(response.status === 200) {
            dispatch({
                type:UPDATE_FOLLOW,
                payload:{
                    isFollowing:postData.isFollowing,
                    following:postData.following
                }
            })
        }
    })
}
