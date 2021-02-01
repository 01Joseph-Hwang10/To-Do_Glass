import React from 'react'
import { connect } from 'react-redux'
import { COLOR_SEVENTH } from '../../store/variables'
import GlanceCardHeader from './partials/GlanceCardHeader';

function GlanceCard(props) {

    const glance = props.glance

    return (
        <div className="w-full rounded shadow-md flex flex-col p-2 mt-3" style={{backgroundColor:COLOR_SEVENTH}}>
            <div className="w-full">
                <GlanceCardHeader glance={glance} />
            </div>
            <div className="w-full p-2"><span className="text-sm text-gray-700">{glance.description}</span></div>
        </div>
    )
}


export default connect(null,null)(GlanceCard)


