import axios from "axios"
import { URL_TAG } from "../../store/variables"



export const createTag = (postData) => dispatch => {
    axios
    .post(URL_TAG,postData,{withCredentials:true})
    .then(response => {
        console.log(response)
    })
}
