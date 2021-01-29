import React from 'react'
import { switchDisplay } from '../../../functions/switchDisplay';
// import PropTypes from 'prop-types'

function headerMenu(props) {
    return (
        <div className="relative">
            <button className="fas fa-ellipsis-v text-2xl text-gray-600" onClick={switchDisplay}></button>
            <div style={{display:'none'}} className='bg-white absolute rounded p-1 right-1'>
                <div className="p-1"><span>Settings</span></div>
            </div>
        </div>
    )
}

// headerMenu.propTypes = {

// }

export default headerMenu;

