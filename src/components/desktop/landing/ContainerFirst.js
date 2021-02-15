// React
import React from 'react'
// etc
import { switchHidden } from "../../../functions/switchDisplay";
import { COLOR_FOURTH, COLOR_SIXTH } from "../../../store/variables";
import { alertCheckOut } from "../../../functions/alertFunctions";
// Images
import personIcon from '../../../static/images/person-icon.png'
// Components
import Important from "../../../mixins/Important";

export default function ContainerFirst() {

    const figFirstOnSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const input = form.querySelector('input')
        const currentState = input.value
        const formDiv = form.closest('.figFirst__formDiv')
        formDiv.style.display = 'none'
        const parentDiv = form.closest('.figFirst')
        const projectCard = parentDiv.querySelector('.figFirst__projectCard')
        projectCard.querySelector('span').innerText = currentState
        projectCard.style.display = "flex"
        const tryAgain = parentDiv.querySelector('.figFirst__tryAgain')
        tryAgain.style.display = "flex"

        const emptyPinboard = parentDiv.querySelector('.figFirst__emptyPinboard')
        const pinboard = parentDiv.querySelector('.figFirst__pinboard')
        emptyPinboard.style.display='none'
        pinboard.style.display='flex'
        pinboard.querySelector('.figFirst__pinboard__header').querySelector('span').innerText = currentState

        input.value = ""
    }

    const figFirstTryAgain = (e) => {
        const tryAgain = e.target
        const parentDiv = tryAgain.closest('.figFirst')
        const formDiv = parentDiv.querySelector('.figFirst__formDiv')
        formDiv.style.display = "flex"
        const projectCard = parentDiv.querySelector('.figFirst__projectCard')
        projectCard.style.display = "none"
        tryAgain.parentNode.style.display = "none"
        const emptyPinboard = parentDiv.querySelector('.figFirst__emptyPinboard')
        emptyPinboard.style.display = "flex"
        const pinboard = parentDiv.querySelector('.figFirst__pinboard')
        pinboard.style.display = "none"

        const createButton = formDiv.querySelector('button')
        createButton.onClick = switchHidden
    }

    const figFirstSwitchHidden = (e) => {
        const nameButton = (function(){return(e.target.nodeName==="BUTTON"?e.target:e.target.parentNode)})()
        const currentState = nameButton.querySelector('span').innerText
        const buttonParentDiv = nameButton.parentNode
        const input = buttonParentDiv.querySelector('input')
        input.value = currentState
        switchHidden(e)
    }

    const figFirstChangeName = (e) => {
        e.preventDefault()
        const form = e.target
        const formParentDiv = form.parentNode
        const nameButton = formParentDiv.querySelector('button')
        const input = form.querySelector('input')
        const parentDiv = form.closest('.figFirst')
        const projectCard = parentDiv.querySelector('.figFirst__projectCard')
        nameButton.querySelector('span').innerText = input.value
        projectCard.querySelector('span').innerText = input.value
        
        nameButton.style.display = 'block'
        form.style.display = 'none'
    }


    return (

        <div className="containerFirst w-full flex flex-col lg:flex-row justify-around items-center space-y-10 lg:space-x-2">

            <div className="descriptionFirst flex flex-col justify-center items-start space-y-2 bg-gradient-to-b from-blue-100 to-blue-50 p-8 py-10 2xl:p-16 rounded-lg shadow-md">
                <div className="flex flex-col justify-center items-start"><span className="text-3xl font-semibold">Start the Project</span></div>
                <div className="flex flex-col justify-center items-start">
                    <span className="text-gray-700">Just name and create, and start out the project</span>
                    <span className="text-gray-700">Flglance provides convenient features for task managing</span>
                    <span className="text-gray-700">Check out below for furthermore like Scheme, TaskHolder, Glance</span>
                </div>
            </div>

            <div className="figFirst flex justify-center items-start space-x-2">

                <div className="flex flex-col justify-start items-center">

                    <div className="w-full py-4 px-2 flex flex-col items-center mt-3 justify-center space-y-1 shadow-sm" style={{backgroundColor:COLOR_FOURTH}}>
                        <div className="w-8 h-8 rounded-2xl bg-cover bg-center" style={{backgroundImage:`url(${personIcon})`}}></div>
                        <div><span className="font-semibold text-xl">Alex</span></div>
                        <div className="flex flex-col justify-center items-center">
                            <span className="text-center text-sm">Passionate junior developer</span>
                            <span className="text-center text-sm">Wanna change the world!</span>
                        </div>
                        <div><span>alex@test.com</span></div>
                    </div>

                    <div className="figFirst__projectCard w-full mt-2 px-2 flex justify-between items-center" style={{display:'none',backgroundColor:COLOR_FOURTH}}>
                        <div><span className="xl:text-lg font-semibold underline text-blue-600"></span></div>
                        <div><Important isImportant={false} /></div>
                    </div>

                    <div className="figFirst__formDiv w-full py-1 mt-2 rounded flex justify-between" style={{backgroundColor:COLOR_FOURTH}}>
                        <button onClick={switchHidden} style={{display:'block'}} className="w-full"><i className="fas fa-plus-circle text-xl"></i></button>
                        <form onSubmit={figFirstOnSubmit} className="w-full flex justify-around items-center space-x-1" style={{display:'none'}}>
                            <input required className="w-28 bg-transparent rounded border-2 focus:border-gray-600" placeholder="Name" style={{transition:'all 0.4s ease-in-out'}}></input>
                            <button className="bg-gray-100 text-center font-semibold px-2 py-1">Create</button>
                        </form>
                    </div>

                    <div className="figFirst__tryAgain w-full py-1 mt-2 rounded flex justify-between bg-green-300" style={{display:'none'}}>
                        <button onClick={figFirstTryAgain} className="bg-transparent z-10 text-center font-bold w-full py-px">Try Again</button>
                    </div>

                </div>

                <div className="figFirst__emptyPinboard h-72 w-64 flex justify-center items-center rounded p-4 shawow-inner" style={{backgroundColor:COLOR_FOURTH,display:'flex'}}>
                    <span className="text-center">Currently no project are loaded</span>
                </div>

                <div className="figFirst__pinboard space-y-2 flex w-64 flex-col w-64 justify-center items-start rounded shadow-inner bg-blue-50" style={{display:'none'}}>

                    <div className="figFirst__pinboard__header w-full flex justify-start items-center px-2 pt-2 rounded bg-gradient-to-b from-blue-100 to-blue-50">
                        <button onClick={alertCheckOut} className="rounded-3xl hover:bg-gray-300" style={{transition:'all 0.1s ease-in-out'}}><Important isImportant={false} /></button>
                        <div>
                            <button onClick={figFirstSwitchHidden} className="border-2 rounded-lg border-transparent hover:border-gray-300" style={{display:'block'}}><span></span></button>
                            <form onSubmit={figFirstChangeName} style={{display:'none'}}>
                                <input required placeholder="Name" className="bg-transparent w-7/12 outline-none"></input>
                            </form>
                        </div>
                    </div>

                    <div className="p-2 w-full">
                        <div className="flex w-full justify-start items-center p-2 space-x-2 bg-blue-100 shadow-inner rounded">
                            <div className="rounded w-16 h-10" style={{backgroundColor:COLOR_SIXTH}}></div>
                            <div className="rounded w-16 h-10" style={{backgroundColor:COLOR_SIXTH}}></div>
                            <div className="rounded w-16 h-10" style={{backgroundColor:COLOR_SIXTH}}></div>
                        </div>
                    </div>

                    <div className="w-full flex justify-center py-4"><i className="fas fa-ellipsis-v text-2xl text-center"></i></div>

                </div>

            </div>
        </div>

    )
}
