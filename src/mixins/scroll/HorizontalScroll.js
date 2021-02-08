// React
import React from 'react'
// modules
import { DragDropContext, Droppable } from "react-beautiful-dnd";
// etc
import { COLOR_FIRST } from '../../store/variables';
// import PropTypes from 'prop-types'


function HorizontalScroll(props) {

    const scrollRight = (e) => {
        const div = e.target.parentNode.childNodes[2];
        div.scrollBy({
            top:0,
            left:200,
            behavior:'smooth'
        });
    };

    const scrollLeft = (e) => {
        const div = e.target.parentNode.childNodes[2];
        div.scrollBy({
            top:0,
            left:-200,
            behavior:'smooth'
        });
    };

    return (
        <div className="relative w-full">
            <button onClick={scrollLeft} className='fas fa-chevron-circle-left absolute left-2 text-3xl z-20' style={{top:"30%",color:COLOR_FIRST}}></button>
            <button onClick={scrollRight} className='fas fa-chevron-circle-right absolute right-2 text-3xl z-20' style={{top:"30%",color:COLOR_FIRST}}></button>
            <DragDropContext onDragEnd={props.onDragEnd}>
                <Droppable droppableId="card" direction="horizontal">
                    {
                        (provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className='scroller flex justify-start flex-nowrap overflow-x-auto' style={{transition:"all 0.5s linear"}}>
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

export default HorizontalScroll

