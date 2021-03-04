import React from 'react'
import { COLOR_FIFTH, URL_PROXY } from "../../store/variables";

function ResetPassword() {
    window.location.href = `${URL_PROXY}/auth/password_reset`;
    return (
        <div className="flex justify-center items-center" style={{width:'100vw',height:'90vh',backgroundColor:COLOR_FIFTH}}>
            <span className="text-center font-semibold text-6xl">Loading...</span>
        </div>
    );
}


export default ResetPassword;
