// React
import React, { useEffect, useState } from 'react'
// Redux
import { connect } from 'react-redux'
import {updateContainer, deleteContainer,updateImportance} from '../../../../actions/todoactions/containerActions';
import {getProject} from '../../../../actions/todoactions/projectActions';
// etc
import { COLOR_FIRST, COLOR_SIXTH } from '../../../../store/variables'
import PropTypes from 'prop-types'
// import { switchDisplay } from '../../../../functions/switchDisplay';
// Component
import Important from '../../../../mixins/Important'
import CTCInput from '../../../../mixins/input/CTCInput';

function SchemeCard(props) {

    const container = props.container
    const permission = props.permission
    // const projectId = container.project_id

    const [importance,setImportance] = useState(container.importance)
    useEffect(()=>{
        if(container.importance) {
            setImportance(true)
        } else {
            setImportance(false)
        }
    },[importance,container.importance])


    const deleteContainer = async (e) => {
        const div = e.target.closest('.schemeCard')
        const contentBody = div.querySelector('.contentBody')
        const deleting = div.querySelector('.deleting')
        contentBody.style.display = 'none'
        deleting.style.display = 'flex'
        await props.deleteContainer(container.id)
    }

    const updateImportance = async () => {
        const currentState = container.importance
        const postData = {
            importance:!currentState,
            user_id:localStorage.getItem('user_id')
        }
        await props.updateContainer(postData,container.id)
        setImportance(!currentState)
    }

    return (
        <div className="schemeCard rounded shadow-lg w-40 h-32 mx-2 flex flex-col justify-start items-center" style={{backgroundColor:COLOR_SIXTH}}>
            {props.permission ? (
            <>
                <div className="w-full flex justify-center items-start">
                    <div className="w-3/12 flex justify-start pl-2"><button className="fas fa-trash-alt text-sm hover:bg-gray-300 rounded-3xl px-1 py-px" onClick={deleteContainer}></button></div>
                    <div className="w-6/12 h-8 bg-pink-200 inset-0 flex justify-center rounded-b"><i className="fas fa-grip-lines-vertical inset-0 text-2xl" style={{color:COLOR_FIRST}}></i></div>
                    <button className="w-3/12 flex justify-end pr-2 text-sm" onClick={updateImportance}>
                        <Important isImportant={importance} top={true} permission={permission} />
                    </button>
                </div>
                <div className="contentBody w-full h-full flex flex-col justify-around items-center" style={{display:'flex'}}>
                    <CTCInput 
                        key={['containerName',String(container.id)].join('')}
                        id={container.id}
                        name={container.name}
                        permission={permission}
                        dataType={"name"}
                        action={props.updateContainer}
                        // afterAction={props.getProject}
                        // afterActionInput={projectId}
                        placeholder={"Scheme"}
                        />
                    {/* <div className="mt-px" style={{display:'none'}}>
                        <button className="text-xs bg-pink-100 p-1 px-2 rounded font-semibold" onClick={switchDisplay}>Detail</button>
                        <div className="absolute w-full right-1 bg-gray-200 rounded z-20" style={{display:'none',minWidth:"30px"}}>
                            <CTCInput 
                                id={container.id}
                                name={container.description || "No Description"}
                                permission={permission}
                                dataType={"description"}
                                action={props.updateContainer}
                                // afterAction={props.getProject}
                                // afterActionInput={projectId}
                                placeholder={"Scheme Description"}
                                />
                        </div>
                    </div> */}
                </div>
                <div className='deleting w-full h-full flex justify-center items-center' style={{display:'none'}}>
                    <span className="text-center font-semibold">Deleting...</span>
                </div>

            </>
            ) : (
            <>
                <div className="w-full flex justify-center items-start">
                    <div className="w-3/12 flex justify-start pl-2 h-1"></div>
                    <div className="w-6/12 h-5 bg-pink-200 inset-0 flex justify-center rounded-b"><i className="fas fa-grip-lines-vertical inset-0"></i></div>
                    <div className="w-3/12 flex justify-end pr-2 text-sm">
                        <Important isImportant={container.importance} />
                    </div>
                </div>
                <div className="w-full h-full flex flex-col justify-around items-center">
                    <span className="font-semibold text-center">{container.name}</span>
                    {/* <div className="mt-px">
                        <button className="text-xs bg-pink-100 p-1 px-2 rounded font-semibold" onClick={switchDisplay}>Detail</button>
                        <div className="absolute w-full right-1 bg-gray-200 rounded z-20" style={{display:'none',minWidth:"30px"}}>
                            <span>{container.description || "No Description"}</span>
                        </div>
                    </div> */}
                </div>
            </>
            )}
        </div>
    )
}

const actions = {updateContainer, getProject, deleteContainer,updateImportance}

SchemeCard.propTypes = {
    updateContainer:PropTypes.func.isRequired,
    getProject:PropTypes.func.isRequired,
    deleteContainer:PropTypes.func.isRequired,
    updateImportance:PropTypes.func.isRequired,
}

export default connect(null,actions)(SchemeCard);

