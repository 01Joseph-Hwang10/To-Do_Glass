import React from 'react'
import { COLOR_FIFTH } from "../../store/variables";

export default function ResetPassword() {
    window.location.href = 'https://flglance.net:8001/auth/password_reset'
    return (
        <div className="flex justify-center items-center" style={{width:'100vw',height:'90vh',backgroundColor:COLOR_FIFTH}}>
            <span className="text-center font-semibold text-6xl">Loading...</span>
        </div>
    );
}
