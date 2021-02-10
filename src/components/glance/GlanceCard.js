import React from 'react'
import { connect } from 'react-redux'
import Tag from '../../mixins/Tag';
import { COLOR_SEVENTH } from '../../store/variables'
import GlanceCardHeader from './partials/GlanceCardHeader';

function GlanceCard(props) {

    const glance = props.glance
    const tags = glance.get_tags

    return (
        <div className="w-full rounded shadow-md flex flex-col p-2 mt-3" style={{backgroundColor:COLOR_SEVENTH}}>
            <div className="w-full">
                <GlanceCardHeader glance={glance} />
            </div>
            <div className="w-full p-2"><span className="text-sm text-gray-700">{glance.description}</span></div>
            <div className="w-full flex justify-start items-center flex-wrap">
                {
                    tags.map(tag => {
                        return (
                            tag && tag.id ? (
                                <div key={tag.id} className="mb-1 mr-1 font-semibold">
                                    <Tag tag={tag} bgColor={"bg-blue-300"} />
                                </div>
                            ) : (
                                <></>
                            )
                        )
                    })
                }
            </div>
        </div>
    )
}


export default connect(null,null)(GlanceCard)


