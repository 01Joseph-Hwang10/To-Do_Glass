import React from 'react'
// import PropTypes from 'prop-types'


function HorizontalScroll(props) {


    return (
        <div className='flex justify-start flex-nowrap overflow-x-auto'>
            {props.card}
        </div>
    )
}

// HorizontalScroll.propTypes = {

// }

export default HorizontalScroll

