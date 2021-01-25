import React, { Component } from 'react'
import { connect } from 'react-redux';
// import PropTypes from 'prop-types'

class CTCInput extends Component {

    render() {
        
        const OnClick = e => {
            const button = e.target
            const currentState = button.innerText
            const div = e.target.parentNode
            const form = div.childNodes[1]
            const input = form.childNodes[0]
            input.value = currentState
            button.style.display="none"
            form.style.display="block"
            input.focus()
            document.addEventListener('click',(e)=>{
                if(e.target !== button && e.target !== form && e.target !== input) {
                    button.style.display="block"
                    form.style.display="none"
                }
            })
        };


        const OnSubmit = e => {
            e.preventDefault()
            const form = e.target
            const input = form.childNodes[0]
            const div = e.target.parentNode
            const button = div.childNodes[0]
            const inputValue = input.value;
            const dataType = input.name;
            const postData = {}
            postData[dataType] = inputValue
            const action = this.props.action
            const id = this.props.id
            action(postData,id)
            if(this.props.afterAction) this.props.afterAction()
            button.style.display="block"
            form.style.display="none"
        };

        return (
            <>
            {this.props.permission ? (
                <div className='w-full h-full'>
                    <button className='w-full h-full' style={{display:'block'}} onClick={OnClick}>{this.props.name}</button>
                    <form className='w-full h-full' style={{display:'none'}} onSubmit={OnSubmit}>
                        <input className='w-full h-full' name={this.props.dataType} placeholder="Project Name"></input>
                    </form>
                </div>
            ) : (
                <span>{this.props.name}</span>
            )}
            </>
        )
    }
}

// CTCInput.propTypes = {

// }

export default connect(null,null)(CTCInput);