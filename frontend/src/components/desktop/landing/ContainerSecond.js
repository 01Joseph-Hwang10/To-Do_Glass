// React
import React from 'react'
// etc
import { alertCheckOut } from '../../../functions/alertFunctions';
import { switchHidden } from '../../../functions/switchDisplay';
import { selectColor, selectColorScheme } from '../../../functions/tailwindColorScheme';
import { COLOR_FIRST, COLOR_SIXTH } from "../../../store/variables";
// Components
import Important from '../../../mixins/Important';

export default function ContainerSecond(props) {

    const figSecondShowForm = (e) => {
        const nameButton = e.target
        const buttonParentDiv = nameButton.parentNode
        const input = buttonParentDiv.querySelector('input')
        input.value = nameButton.innerText
        switchHidden(e)
    }

    const figSecondChangeName = (e) => {
        e.preventDefault()
        const form = e.target
        const formParentDiv = form.parentNode
        const nameButton = formParentDiv.querySelector('button')
        const input = form.querySelector('input')
        nameButton.innerText = input.value
        form.style.display = 'none'
        nameButton.style.display = 'block'
    }

    const figSecondOnSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const formParentDiv = form.parentNode
        const button = formParentDiv.querySelector('button')
        const input = form.querySelector('input')
        const currentState = input.value
        form.style.display = 'none'
        button.style.display = 'block'
        formParentDiv.style.display = 'none'

        const container = form.closest('.container')
        const newContainer = container.querySelector('.container__willCreate')
        newContainer.querySelector('.container__willCreate__name').innerText = currentState
        newContainer.style.display = 'flex'

        const placeholder = container.querySelector('.container__placeholder')
        placeholder.style.opacity = 1
        placeholder.querySelector('button').style.display = 'block'
        
        const pinboard = container.closest('.figSecond__pinboard')
        const task = pinboard.querySelector('.task')
        const taskWillCreate = task.querySelector('.task__willCreate')
        taskWillCreate.style.display = 'flex'
        
        input.value=""
    }

    const figSecondTryAgain = (e) => {
        const tryAgain = e.target
        const placeholder = tryAgain.closest('.container__placeholder')
        const container = placeholder.closest('.container')
        const form = container.querySelector('.container__form')
        const newContainer = container.querySelector('.container__willCreate')
        form.style.display='flex'
        newContainer.style.display = 'none'
        placeholder.style.opacity = 0
        tryAgain.style.display = 'none'

        const pinboard = container.closest('.figSecond__pinboard')
        const task = pinboard.querySelector('.task')
        const taskWillCreate = task.querySelector('.task__willCreate')
        taskWillCreate.style.display = 'none'
    }

    return (

    <div className="containerSecond w-full flex flex-col lg:flex-row-reverse justify-around items-center space-y-10 lg:space-y-0 py-10 sm:py-16 border-b-2">

        <div className="descriptionSecond w-full sm:w-auto flex flex-col justify-center items-start space-y-2 p-8 py-10 bg-gradient-to-b from-red-100 to-pink-50 rounded shadow-md 2xl:p-16">
            <div className="flex flex-col justify-center items-start"><span className="text-3xl font-semibold">Construct the Scheme</span></div>
            <div className="flex flex-col justify-center items-start">
                <span className="text-gray-700">Set up the frame of the project</span>
                <span className="text-gray-700">Inspired by PERT chart, it gives you the big picture of project</span>
                <span className="text-gray-700">Just name and create, construct the plan for the project</span>
                <span className="text-green-500 text-xl font-semibold">Cilck <i className='fas fa-plus-circle text-gray-700'></i> and have a try!!</span>
            </div>
        </div>

        <div className="figSecond">

            <div className="figSecond__pinboard space-y-2 flex flex-col justify-center items-start rounded shadow-inner bg-blue-50">

                <div className="w-full flex justify-center py-4"><i className="fas fa-ellipsis-v text-2xl text-center"></i></div>

                <div className="p-2 w-full">
                    <div className="container flex w-full justify-start items-center p-2 space-x-2 bg-blue-100 shadow-inner rounded">

                        <div className="container__example rounded w-32 h-24 flex flex-col justify-start items-center shadow-md" style={{backgroundColor:COLOR_SIXTH}}>
                            <div className="w-full flex items-start justify-center">
                                <div className="w-3/12 flex justify-center items-center"><button onClick={alertCheckOut} className="fas fa-trash p-1 rounded-3xl hover:bg-gray-300" style={{transition:'all .1 ease-in-out'}}></button></div>
                                <div className="w-6/12 bg-pink-200 rounded-b flex justify-center items-start"><button onMouseDown={alertCheckOut} className="fas fa-grip-lines-vertical text-center"></button></div>
                                <div className="w-3/12 flex justify-center items-center"><button onClick={alertCheckOut} className="rounded-3xl hover:bg-gray-300" style={{transition:'all .1 ease-in-out'}}><Important isImportant={false} /></button></div>
                            </div>
                            <div className="w-full h-full flex justify-center items-center">
                                <button onClick={figSecondShowForm} style={{display:'block'}} className="w-full h-full text-center font-semibold border-2 border-transparent hover:border-gray-300 rounded">Important Tasks</button>
                                <form onSubmit={figSecondChangeName} style={{display:'none'}} className="w-full flex justify-center">
                                    <input required className="outline-none w-11/12 bg-transparent mx-auto text-center"></input>
                                </form>
                            </div>
                        </div>

                        <div className="container__willCreate rounded w-32 h-24 flex flex-col justify-start items-center shadow-md" style={{backgroundColor:COLOR_SIXTH,display:'none'}}>
                            <div className="w-full flex items-start justify-center">
                                <div className="w-3/12 flex justify-center items-center"><button onClick={alertCheckOut} className="fas fa-trash p-1 rounded-3xl hover:bg-gray-300" style={{transition:'all .1 ease-in-out'}}></button></div>
                                <div className="w-6/12 bg-pink-200 rounded-b flex justify-center items-start"><button onMouseDown={alertCheckOut} className="fas fa-grip-lines-vertical text-center"></button></div>
                                <div className="w-3/12 flex justify-center items-center"><button onClick={alertCheckOut} className="rounded-3xl hover:bg-gray-300" style={{transition:'all .1 ease-in-out'}}><Important isImportant={false} /></button></div>
                            </div>
                            <div className="w-full h-full flex justify-center items-center">
                                <button onClick={figSecondShowForm} style={{display:'block'}} className="container__willCreate__name w-full h-full text-center font-semibold border-2 border-transparent hover:border-gray-300 rounded"></button>
                                <form onSubmit={figSecondChangeName} style={{display:'none'}} className="w-full flex justify-center">
                                    <input required className="outline-none w-11/12 bg-transparent mx-auto text-center"></input>
                                </form>
                            </div>
                        </div>

                        <div className="container__form rounded w-32 h-24 flex justify-center items-center shadow-md" style={{backgroundColor:COLOR_SIXTH,display:'flex'}}>
                            <button onClick={switchHidden} style={{display:'block'}} className="w-full h-full fas fa-plus-circle"></button>
                            <form onSubmit={figSecondOnSubmit} style={{display:'none'}} className="w-full h-full flex flex-col justify-around items-center">
                                <input required className="outline-none w-11/12 bg-transparent mx-auto text-center rounded border-2 border-gray-300" placeholder="Scheme"></input>
                                <button className="py-1 px-2 bg-pink-100 text-center font-semibold">Create</button>
                            </form>
                        </div>

                        <div className="container__placeholder rounded w-32 h-24 flex justify-center items-center bg-green-300 shadow-md" style={{opacity:0,display:'block'}}>
                            <button onClick={figSecondTryAgain} className="w-full h-full text-center font-semibold" style={{display:'none'}}>Try Again</button>
                        </div>

                    </div>
                </div>

                <div className="task p-2 w-full flex flex-col">

                    <div className="task__example w-full border-t-2 border-b-2 flex">
                        <div className="w-1/12 flex justify-center items-center">
                            <span className="text-center">1</span>
                        </div>
                        <div className="w-11/12 flex justify-start items-start" style={{borderColor:COLOR_FIRST}}>
                            <button onMouseDown={alertCheckOut} className="flex flex-col justify-start items-center w-16 h-12 border border-b-2" style={{backgroundColor:selectColor(selectColorScheme())}}><i className="fas fa-grip-lines-vertical"></i></button>
                            <button onMouseDown={alertCheckOut} className="flex flex-col justify-start items-center w-16 h-16 border border-b-2" style={{backgroundColor:selectColor(selectColorScheme())}}><i className="fas fa-grip-lines-vertical"></i></button>
                            <button onMouseDown={alertCheckOut} className="flex flex-col justify-start items-center w-16 h-10 border border-b-2" style={{backgroundColor:selectColor(selectColorScheme())}}><i className="fas fa-grip-lines-vertical"></i></button>
                        </div>
                    </div>

                    <div className="task__willCreate w-full border-b-2 flex" style={{display:'none'}}>
                        <div className="w-1/12 flex justify-center items-center">
                            <span className="text-center">2</span>
                        </div>
                        <div className="w-11/12 flex justify-start items-start" style={{borderColor:COLOR_FIRST}}>
                            <button onMouseDown={alertCheckOut} className="flex flex-col justify-start items-center w-16 h-10 border border-b-2" style={{backgroundColor:selectColor(selectColorScheme())}}><i className="fas fa-grip-lines-vertical"></i></button>
                        </div>
                    </div>

                </div>


            </div>

        </div>

    </div>
    )
}
