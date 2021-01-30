import React from 'react'
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
            <button onClick={scrollLeft} className='fas fa-chevron-circle-left absolute left-2 text-3xl' style={{top:"30%",color:COLOR_FIRST}}></button>
            <button onClick={scrollRight} className='fas fa-chevron-circle-right absolute right-2 text-3xl' style={{top:"30%",color:COLOR_FIRST}}></button>
            <div className='scroller flex justify-start flex-nowrap overflow-x-auto'>
                {props.card}
            </div>
        </div>
    )
}

// HorizontalScroll.propTypes = {

// }

export default HorizontalScroll

