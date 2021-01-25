import React from 'react'
// import PropTypes from 'prop-types'
import CTCInput from '../../mixins/input/CTCInput'

function Header(props) {


    return (
        <div>
            <div>
                <CTCInput 
                name={props.project.name} 
                permission={props.permission}
                />
            </div>
            <div>ToolBar</div>
        </div>
    )
}

// Header.propTypes = {

// }

export default Header

