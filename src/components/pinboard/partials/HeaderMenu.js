import React from 'react'
import { switchDisplay } from '../../../functions/switchDisplay';
// import PropTypes from 'prop-types'

function headerMenu(props) {
    return (
        <div className="relative">
            <button onClick={switchDisplay}>Menu</button>
            <div style={{display:'none'}} className='bg-white absolute'>
                <div><span>Settings</span></div>
            </div>
        </div>
    )
}

// headerMenu.propTypes = {

// }

export default headerMenu;

