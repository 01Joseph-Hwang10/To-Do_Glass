import React from 'react'
import { alertCheckOut } from '../../../functions/alertFunctions'
import { switchHidden } from '../../../functions/switchDisplay'
import { selectColor, selectColorScheme } from '../../../functions/tailwindColorScheme'
import Important from '../../../mixins/Important'
import { COLOR_FIRST, COLOR_THIRD } from '../../../store/variables'

export default function ContainerThird(props) {

    const figThirdSwitchHidden = (e) => {
        const nameButton = e.target
        const buttonParentDiv = nameButton.parentNode
        const input = buttonParentDiv.querySelector('input')
        input.value = nameButton.innerText
        switchHidden(e)
    }

    const figThirdChangeName = (e) => {
        e.preventDefault()
        const form = e.target
        const input = form.querySelector('input')
        const formParentDiv = form.parentNode
        const nameButton = formParentDiv.querySelector('button')
        nameButton.innerText = input.value
        input.value = ""
        nameButton.style.display = 'block'
        form.style.display = 'none'
    }

    const figThirdComplete = (e) => {
        const button = e.target
        const div = button.parentNode.parentNode
        div.style.backgroundColor = "rgb(229,231,235)"

        const buttonDiv = button.parentNode
        const anotherButton = buttonDiv.querySelector('.uncomplete')
        anotherButton.style.display = 'block'
        button.style.display = 'none'
    }

    const figThirdUncomplete = (e) => {
        const button = e.target
        const div= button.parentNode.parentNode
        div.style.backgroundColor = selectColor(selectColorScheme())

        const buttonDiv = button.parentNode
        const anotherButton = buttonDiv.querySelector('.complete')
        anotherButton.style.display = 'block'
        button.style.display = 'none'
    }

    const figThirdCreateTask = (e) => {
        e.preventDefault()
        const form = e.target
        const input = form.querySelector('input')
        const tasks = form.closest('.tasks')
        const taskForm = form.closest('.task__form')
        const taskWillCreate = tasks.querySelector('.task__willCreate')
        const taskPlaceholder = tasks.querySelector('.task__placeholder')
        const currentState = input.value
        input.value = ""
        taskForm.style.display = 'none'
        taskWillCreate.querySelector('.task__willCreate__name').innerText = currentState
        taskWillCreate.style.display = 'flex'
        taskPlaceholder.style.opacity = 1
        taskPlaceholder.querySelector('button').style.display = 'block'
    }

    const figThirdTryAgain = (e) => {
        const button = e.target
        const tasks = button.closest('.tasks')
        const taskForm = tasks.querySelector('.task__form')
        const taskWillCreate = tasks.querySelector('.task__willCreate')
        const taskPlaceholder = tasks.querySelector('.task__placeholder')
        const taskExample = tasks.querySelector('.task__example')
        taskForm.style.display = 'flex'
        taskWillCreate.style.backgroundColor = selectColor(selectColorScheme())
        taskExample.style.backgroundColor = selectColor(selectColorScheme())
        taskWillCreate.style.display = 'none'
        taskExample.querySelector('.task__example__name').innerText = "Important Task"
        taskPlaceholder.style.opacity = 0
        button.style.display = 'none'
    }

    const figThirdOnMouseOver = (e) => {
        const taskHolder = e.target.closest('.taskHolder')
        const taskHolderHeader = taskHolder.querySelector('.taskHolder__header')
        const icon = taskHolderHeader.querySelector('i')
        const taskHolderBody = taskHolder.querySelector('.taskHolder__body')
        taskHolderHeader.style.transition = 'all 0.4s ease-in-out'
        taskHolderBody.style.transition = 'all 0.4s ease-in-out'
        taskHolderHeader.style.width = '30%'
        taskHolderBody.style.width = '70%'
        icon.style.opacity = 0
        
        const componentBody = taskHolderHeader.querySelector('.componentBody')
        componentBody.style.transition = 'all 0.2s ease-in-out 0.4s'
        componentBody.style.fontSize = 'medium'
        componentBody.style.opacity = 1
        
        taskHolderHeader.addEventListener('mouseout',()=>{
            taskHolderHeader.style.transition = 'all 0.4s ease-in-out 0.2s'
            taskHolderBody.style.transition = 'all 0.4s ease-in-out 0.2s'
            componentBody.style.transition = 'all 0.2s ease-in-out'
            componentBody.style.fontsize = 0
            taskHolderHeader.style.width = '8.3%'
            taskHolderBody.style.width = '91.7%'
            icon.style.opacity = 1
            componentBody.style.opacity = 0
        })
    }

    return (
    <div className="containerThird w-full flex flex-col lg:flex-row justify-around items-center space-y-10 lg:space-y-0 py-10 sm:py-16 border-b-2">

        <div className="descriptionThird w-full sm:w-auto flex flex-col justify-center items-start space-y-2 bg-gradient-to-b from-gray-200 to-gray-50 p-8 rounded shadow-md">
            <div className="flex flex-col justify-center items-start"><span className="text-3xl font-semibold">Make it more Concrete</span></div>
            <div className="flex flex-col justify-center items-start">
                <span className="text-gray-700">Based on your Scheme, TaskHolder will be created at each Scheme Card</span>
                <span className="text-gray-700">Inspired by GANTT chart, it ables you to manage tasks efficiently</span>
                <span className="text-gray-700">Just name and create, and take the first step of the project</span>
                <span className="text-green-500 text-xl font-semibold">Cilck <i className='fas fa-plus-circle text-gray-700'></i> and have a try!!</span>
            </div>
        </div>

        <div className="figThird">

            <div className="figThird__pinboard space-y-2 flex flex-col justify-center items-start rounded shadow-inner bg-blue-50 p-2" style={{minWidth:'500px'}}>

                <div className="w-full flex justify-center py-4"><i className="fas fa-ellipsis-v text-2xl text-center"></i></div>

                <div className="taskHolder border-t-2 border-b-2 w-full flex justify-center items-center">

                    <div onMouseOver={figThirdOnMouseOver} className="taskHolder__header h-full flex justify-start items-center space-x-1 pl-1" style={{width:'8.3%'}}>
                        <div className="componentHeader flex justify-center items-center">
                            <span>1</span>
                            <i className="fas fa-chevron-right" style={{transition:'all 0.2s ease-in-out',opacity:1}}></i>
                        </div>
                        <div className="componentBody flex flex-col justify-center items-center space-y-2" style={{opacity:0,fontSize:0}}>
                            <div className="flex justify-start items-center">
                                <button onClick={alertCheckOut} className="rounded-3xl hover:bg-gray-300" style={{transition:'all 0.1s ease-in-out'}}><Important isImportant={false} /></button>
                                <div><span>Important Tasks</span></div>
                            </div>
                            <div className="flex justify-end items-center">
                                <button onClick={alertCheckOut} className="px-2 rounded font-semibold text-white" style={{backgroundColor:COLOR_THIRD}}>Detail</button>
                            </div>
                        </div>
                    </div>

                    <div className="taskHolder__body border-l-2" style={{width:'91.7%'}}>

                        <div className="tasks w-full border-t-8 border-double flex justify-start items-start" style={{borderColor:COLOR_FIRST}}>

                            <div className="task__example w-24 flex flex-col justify-start items-center border-b-2" style={{backgroundColor:selectColor(selectColorScheme())}}>
                                <div className="w-full h-full flex justify-center items-start"><button className="fas fa-grip-lines-vertical text-center w-full"></button></div>
                                <div className="w-full h-full flex justify-center items-center">
                                    <button onClick={figThirdSwitchHidden} className="task__example__name text-center font-semibold w-full rounded border-2 border-transparent hover:border-gray-300" style={{display:'block'}}>Important Task</button>
                                    <form onSubmit={figThirdChangeName} className='flex h-full justify-center items-center space-y-2 outline-none' style={{display:'none'}}>
                                        <input required className="w-11/12 p-1 bg-transparent outline-none border-2 rounded" placeholder='Name' style={{transition:'all 0.2s ease-in-out'}}></input>
                                    </form>
                                </div>
                                <div className="w-full flex justify-center items-center space-x-1 pb-2">
                                    <button onClick={alertCheckOut} className="far fa-times-circle"></button>
                                    <button onClick={alertCheckOut} className="fas fa-info-circle"></button>
                                    <button onClick={figThirdComplete} className="complete far fa-check-circle" style={{display:'block'}}></button>
                                    <button onClick={figThirdUncomplete} className="uncomplete far fa-check-circle" style={{display:'none'}}></button>
                                </div>
                            </div>

                            <div className="task__willCreate w-24 flex flex-col justify-start items-center border-b-2" style={{backgroundColor:selectColor(selectColorScheme()),display:'none'}}>
                                <div className="w-full flex justify-center items-start"><button className="fas fa-grip-lines-vertical text-center w-full"></button></div>
                                <div className="w-full flex justify-center items-center">
                                    <button onClick={figThirdSwitchHidden} className="task__willCreate__name text-center font-semibold w-full rounded border-2 border-transparent hover:border-gray-300" style={{display:'block'}}></button>
                                    <form onSubmit={figThirdChangeName} className='flex h-full justify-center items-center space-y-2 outline-none' style={{display:'none'}}>
                                        <input required className="w-11/12 p-1 bg-transparent outline-none border-2 rounded" placeholder='Name' style={{transition:'all 0.2s ease-in-out'}}></input>
                                    </form>
                                </div>
                                <div className="w-full flex justify-center items-center space-x-1 pb-2">
                                    <button onClick={alertCheckOut} className="far fa-times-circle"></button>
                                    <button onClick={alertCheckOut} className="fas fa-info-circle"></button>
                                    <button onClick={figThirdComplete} className="complete far fa-check-circle" style={{display:'block'}}></button>
                                    <button onClick={figThirdUncomplete} className="uncomplete far fa-check-circle" style={{display:'none'}}></button>
                                </div>
                            </div>

                            <div className="task__form w-24 flex flex-col justify-center items-center border-b-2" style={{minHeight:'6rem',backgroundColor:selectColor(selectColorScheme()),display:'flex'}}>
                                <button onClick={switchHidden} className="w-full fas fa-plus-circle text-center h-24" style={{display:'block'}}></button>
                                <form onSubmit={figThirdCreateTask} className="w-full h-full flex flex-col justify-center items-center space-y-2" style={{display:'none',minHeight:'6rem'}}>
                                    <input required className="w-11/12 p-1 h-7 bg-transparent outline-none border-2 rounded" placeholder="Name"></input>
                                    <button className="text-center px-2 rounded bg-gray-200">Create</button>
                                </form>
                            </div>

                            <div className="task__placeholder w-24 flex justify-center items-center border-b-2 h-20 bg-green-400" style={{opacity:0}}>
                                <button onClick={figThirdTryAgain} className="w-full h-full text-center font-semibold" style={{display:'none'}}>Try Again</button>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>

    </div>
    )
}
