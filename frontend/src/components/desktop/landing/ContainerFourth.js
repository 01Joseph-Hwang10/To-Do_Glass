import React from 'react'
import { alertCheckOut } from '../../../functions/alertFunctions'
import { COLOR_FIFTH, COLOR_SEVENTH } from '../../../store/variables'
import personIcon from '../../../static/images/person-icon.png'

export default function ContainerFourth(props) {

    const figFourthOnSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const input = form.querySelector('input')
        input.value=''
        alertCheckOut()
    }

    return (
    <div className="containerFourth flex flex-col lg:flex-row-reverse justify-around items-center space-y-10 lg:space-y-0 py-10 sm:py-16 border-b-2">

        <div className="descriptionFourth w-full sm:w-auto flex flex-col justify-center items-start space-y-2 p-8 2xl:p-16 bg-gradient-to-b from-indigo-100 to-indigo-50 shadow-md">
            <div className="flex flex-col justify-center items-start"><span className="text-3xl font-semibold">You're not Alone</span></div>
            <div className="flex flex-col justify-center items-start">
                <span className="text-gray-700">Glance over the other's workflow and get an inspiration by them</span>
                <span className="text-gray-700">Search for projects related to your project</span>
                <span className="text-gray-700">Follow who you're interested in and get his/her workflow firstly</span>
            </div>
        </div>

        <div className="figFourth sm:w-96 p-4 rounded-lg" style={{backgroundColor:COLOR_FIFTH}}>

            <div className="w-full flex space-x-1 items-center">
                <form className="w-full flex justify-between items-center" onSubmit={figFourthOnSubmit}>
                    <input className="flex-grow bg-transparent border-2 p-1 rounded-xl border-gray-400" placeholder="Search for your glance!"></input>
                    <button className="fas fa-search pl-2 text-xl"></button>
                </form>
                <div><button onClick={alertCheckOut} className="far fa-lightbulb text-xl pl-2"></button></div>
            </div>

            <div className="w-full flex flex-col justify-start items-center rounded p-2 space-y-2 mt-2" style={{backgroundColor:COLOR_SEVENTH}}>
                <div className="w-full flex justify-between items-center">
                    <button onClick={alertCheckOut}><span className="underline text-blue-400 font-semibold text-lg">School Homework</span></button>
                    <button onClick={alertCheckOut} className="flex justify-center items-center space-x-1 bg-gray-200 p-2 rounded">
                        <div className="w-8 h-8 rounded-2xl bg-center bg-cover" style={{backgroundImage:`url(${personIcon})`}}></div>
                        <div><span>Brian</span></div>
                    </button>
                </div>
                <div className="w-full flex justify-start items-center">
                    <span>Due: 2021.01.01 Mon, Requirement:pencil,<br></br> I want A plus</span>
                </div>
                <div className="w-full flex justify-start items-center space-x-1">
                    <div className="rounded-2xl bg-blue-200 font-semibold px-2 py-1">Math</div>
                    <div className="rounded-2xl bg-blue-200 font-semibold px-2 py-1">Calculus</div>
                </div>
            </div>

            <div className="w-full flex justify-center py-4"><i className="fas fa-ellipsis-v text-2xl text-center"></i></div>

        </div>

    </div>
    )
}
