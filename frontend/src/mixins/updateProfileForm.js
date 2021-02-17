// React
import React from 'react'
import {Link} from 'react-router-dom'
// Redux
import { connect } from 'react-redux'
import {updateProfile,getProfile} from '../actions/useractions/userInfoActions'
// etc
import { COLOR_FOURTH, COLOR_THIRD } from '../store/variables'
import PropTypes from 'prop-types'

function updateProfileForm(props) {

    const profile = props.location.state.profile

    const OnSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.childNodes[1]
        const avatar = form.childNodes[2]
        const bio = form.childNodes[3]
        const id = profile.id
        const postData = {user_id:id,first_name:name.value}
        if(avatar.files[0]) postData['avatar'] = avatar.files[0]
        if(bio.value) postData['bio'] = bio.value
        await props.updateProfile(postData,id)
        await props.getProfile(id)
        window.location.href=`/#/${id}/home`
    }

    return (
        <div className="rounded w-3/4 lg:w-1/2 flex flex-col justify-center items-center mx-auto p-3" style={{backgroundColor:COLOR_FOURTH}}>
            <form className="w-7/12 flex flex-col justify-center items-center" onSubmit={OnSubmit}>
                <div className="p-2"><span className="text-gray-700 font-semibold text-2xl">Edit Profile</span></div>
                <input required defaultValue={profile.first_name} className="mb-2 border-2 rounded w-full h-10 p-2" type="text" placeholder="Name"></input>
                <input className="mb-2 border-2 rounded w-full bg-white p-2" type="file" accept="image/png, image/jpeg, image/jpg" placeholder="Avatar"></input>
                <input defaultValue={profile.bio} className="mb-2 border-2 rounded w-full h-16 p-2" type="textarea" placeholder="Bio"></input>
                <button className="mb-2 w-full rounded h-10 p-2 text-white font-semibold text-lg" style={{backgroundColor:COLOR_THIRD}}>Update</button>
            </form>
            <div className="flex justify-center items-center w-7/12 rounded h-10 p-2 text-gray-900 font-semibold text-lg bg-gray-300"><Link to={{pathname:`/${profile.id}/home`}}>Cancel</Link></div>
        </div>
    )
}

updateProfileForm.propTypes = {
    updateProfile:PropTypes.func.isRequired,
    getProfile:PropTypes.func.isRequired
}

export default connect(null,{updateProfile,getProfile})(updateProfileForm)

