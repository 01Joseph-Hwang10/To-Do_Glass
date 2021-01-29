import React, { Component } from 'react'
import { connect } from 'react-redux';
// import PropTypes from 'prop-types'

class CTCInput extends Component {

    render() {

        const textAlign = this.props.textAlign || "center"
        
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
            const afterActionInput = this.props.afterActionInput
            console.log(afterActionInput)
            action(postData,id)
            if(this.props.afterAction) {
                if(afterActionInput) {
                    this.props.afterAction(afterActionInput)
                } else {
                    this.props.afterAction()
                }
            }
            button.style.display="block"
            form.style.display="none"
        };

        return (
            <>
            {this.props.permission ? (
                <div className='w-full h-full bg-transparent'>
                    <button className='w-full h-full font-semibold' style={{display:'block',textAlign:textAlign}} onClick={OnClick}>{this.props.name}</button>
                    <form className='w-full h-full' style={{display:'none'}} onSubmit={OnSubmit}>

                        <input className='w-full h-full bg-transparent p-1 border-b-2 border-gray-600' name={this.props.dataType} placeholder="Project Name"></input>
                    </form>
                </div>
            ) : (
                <div className="w-full h-full">
                    <span className="font-semibold">{this.props.name}</span>
                </div>
            )}
            </>
        )
    }
}

// CTCInput.propTypes = {

// }

export default connect(null,null)(CTCInput);