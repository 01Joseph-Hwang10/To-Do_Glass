import React from 'react'
import { COLOR_FIFTH} from "../../store/variables";
import { stripPort } from "../../functions/stringFunctions";

function ResetPassword() {
    window.location.href = `${stripPort(window.location.origin)}/auth/password_reset`;
    return (
        <div className="flex justify-center items-center" style={{width:'100vw',height:'90vh',backgroundColor:COLOR_FIFTH}}>
            <span className="text-center font-semibold text-6xl">Loading...</span>
        </div>
    );
}


export default ResetPassword;
