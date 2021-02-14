import React from 'react'

export default function ContainerThird() {
    return (
    <div className="containerThird w-full flex justify-around items-center">
        <div className="descriptionThird flex flex-col justify-center items-start space-y-2">
            <div className="flex flex-col justify-center items-start"><span className="text-3xl font-semibold">Add the Task</span></div>
            <div className="flex flex-col justify-center items-start">
                <span className="text-gray-700">Make it more concrete, more vivid</span>
                <span className="text-gray-700">Inspired by GANTT chart, it ables you to manage tasksefficiently</span>
                <span className="text-gray-700">You can also move your tasks like a Post-it,</span>
                <span className="text-gray-700">Makes the management more efficiently</span>
            </div>
        </div>
        <div className="figThird"></div>
    </div>
    )
}
