// React
import React from 'react'
// Redux
import { connect } from 'react-redux'
import {updateContainer} from '../../../actions/containerActions';
import {getProject} from '../../../actions/projectActions';
// etc
import { COLOR_SIXTH } from '../../../store/variables'
import PropTypes from 'prop-types'
// Component
import Important from '../../../mixins/Important'
import CTCInput from '../../../mixins/input/CTCInput';

function SchemeCard(props) {

    const container = props.container
    const permission = props.permission
    const projectId = container.project_id

    return (
        <div className="rounded shadow-lg w-32 h-24 mx-2" style={{backgroundColor:COLOR_SIXTH}}>
            {props.permission ? (
            <>
                <div className="w-full flex justify-center items-center">
                    <div className="w-3/12 flex justify-start pl-1 pt-1"><button className="fas fa-trash-alt text-sm"></button></div>
                    <div className="w-6/12 h-5 bg-pink-200 inset-0 flex justify-center rounded-b"><i className="fas fa-grip-lines-vertical inset-0"></i></div>
                    <div className="w-3/12 flex justify-end pr-1 pt-1 text-sm">
                        <Important isImportant={container.importance} />
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <div>
                    <CTCInput 
                            id={container.id}
                            name={container.name}
                            permission={permission}
                            dataType={"name"}
                            action={props.updateContainer}
                            afterAction={props.getProject}
                            afterActionInput={projectId}
                            />
                    </div>
                    <div className="mt-px"><button className="text-xs bg-pink-100 p-1 px-2 rounded font-semibold">Detail</button></div>
                </div>

            </>
            ) : (
            <>
                <div className="w-full flex justify-center items-center">
                    <div className="w-3/12 flex justify-start pl-1 pt-1"></div>
                    <div className="w-6/12 h-5 bg-pink-200 inset-0 flex justify-center rounded-b"><i className="fas fa-grip-lines-vertical inset-0"></i></div>
                    <div className="w-3/12 flex justify-end pr-1 pt-1 text-sm">
                        <Important isImportant={container.importance} />
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <div><button>{container.name}</button></div>
                    <div className="mt-px"><button className="text-xs bg-pink-100 p-1 px-2 rounded font-semibold">Detail</button></div>
                </div>
            </>
            )}
        </div>
    )
}

const actions = {updateContainer, getProject}

SchemeCard.propTypes = {
    updateContainer:PropTypes.func.isRequired,
    getProject:PropTypes.func.isRequired,
}

export default connect(null,actions)(SchemeCard);

