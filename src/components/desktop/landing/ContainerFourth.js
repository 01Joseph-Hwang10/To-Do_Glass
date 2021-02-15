import React from 'react'

export default function ContainerFourth() {
    return (
    <div className="containerFourth w-full flex flex-col lg:flex-row-reverse justify-around items-center space-y-10 lg:space-y-0">
        <div className="figFourth"></div>
        <div className="descriptionFourth flex flex-col justify-center items-start space-y-2">
            <div className="flex flex-col justify-center items-start"><span className="text-3xl font-semibold">You're not Alone</span></div>
            <div className="flex flex-col justify-center items-start">
                <span className="text-gray-700">Glance over the other's workflow</span>
                <span className="text-gray-700">And give your project another rize</span>
                <span className="text-gray-700">Follow who you're interested in</span>
                <span className="text-gray-700">And get his/her workflow firstly</span>
            </div>
        </div>
    </div>
    )
}
