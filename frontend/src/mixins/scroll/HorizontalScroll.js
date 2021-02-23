// React
import React, { useState } from 'react'
// modules
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from 'react-redux';
// etc
import { COLOR_FIRST } from '../../store/variables';
// import PropTypes from 'prop-types'


function HorizontalScroll(props) {

    const [leftOnEdge,setLeftOnEdge] = useState(true)

    const switchButtonVisible = (div) => {
        setTimeout(() => {
            if(div.scrollLeft === 0) {
                setLeftOnEdge(true)
            } else {
                setLeftOnEdge(false)
            }
        }, 510);
    }

    const scrollRight = (e) => {
        const div = e.target.parentNode.querySelector('.scroller');
        div.scrollBy({
            top:0,
            left:200,
            behavior:'smooth'
        });
        switchButtonVisible(div)
    };

    const scrollLeft = (e) => {
        const div = e.target.parentNode.querySelector('.scroller');
        div.scrollBy({
            top:0,
            left:-200,
            behavior:'smooth'
        });
        switchButtonVisible(div)
    };

    const scrollButtonVisible = props.scrollButtonVisible

    return (
        <div className="scrollerParentDiv relative w-full">
            <button onClick={scrollLeft} className='leftButton fas fa-chevron-circle-left absolute left-2 text-3xl z-20' style={{top:"30%",color:COLOR_FIRST,display:(function(){return(scrollButtonVisible && !leftOnEdge?'block':'none')})()}}></button>
            <button onClick={scrollRight} className='rightButton fas fa-chevron-circle-right absolute right-2 text-3xl z-20' style={{top:"30%",color:COLOR_FIRST,display:(function(){return(scrollButtonVisible?'block':'none')})()}}></button>
            <DragDropContext onDragEnd={props.onDragEnd}>
                <Droppable droppableId="card" direction="horizontal">
                    {
                        (provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className='scroller flex justify-start flex-nowrap overflow-x-auto' style={{transition:"all 0.5s ease-in-out"}}>
                            {props.card}
                            {provided.placeholder}
                        </div>
                        )
                    }
                </Droppable>
            </DragDropContext>
        </div>
    )
}

// HorizontalScroll.propTypes = {

// }

const mapStateToProps = state => {
    return {
        scrollButtonVisible:state.screen.scrollButtonVisible
    }
}

export default connect(mapStateToProps,null)(HorizontalScroll)

