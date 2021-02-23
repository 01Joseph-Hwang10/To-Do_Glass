import React, { Component } from 'react'
import { connect } from 'react-redux';
import { capitalize } from '../../functions/stringFunctions';
// import PropTypes from 'prop-types'

class CTCInput extends Component {

    /*
    parameters
    id: item's id, this is also an action's input
    name: item's name or data want to send to backend
    permission: permission you want to assign
    dataType: the name of data type you want to send to backend
    action: the function that'll axios data to backend
    afterAction(Optional): the function that'll do something after the action
    afterActionInput(Optional): the input afterAction recieves
    textAlign: css text align property you want to set. Default is 'center'
    placeholder: the placeholder you want to put into input. Default would be the capitalized dataType
    */


    render() {

        const textAlign = this.props.textAlign || "center"
        const textareaClassName = this.props.key
        
        const OnClick = e => {
            const button = e.target
            const currentState = this.props.name
            const div = e.target.parentNode
            const form = div.querySelector('form')
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

            const textarea = form.querySelector('textarea')
            textarea.style.height = '1px'
            textarea.style.height = (12+textarea.scrollHeight) +'px'
        };


        const OnSubmit = async e => {
            if(e.keyCode === 13 && e.shiftKey === false) {
                e.preventDefault()
                const form = e.target.parentNode
                const div = form.parentNode
                const span = div.querySelector('span')
                form.style.display="none"
                span.style.display='block'

                const input = form.childNodes[0]
                const button = div.querySelector('button')
                const inputValue = input.value;
                const dataType = input.name;
                const postData = {}
                postData[dataType] = inputValue
                postData['user_id'] = localStorage.getItem('user_id')
                const action = this.props.action
                const afterAction = this.props.afterAction
                const id = this.props.id
                const afterActionInput = this.props.afterActionInput
                await action(postData,id)
                if(this.props.afterAction) {
                    if(afterActionInput) {
                        await afterAction(afterActionInput)
                    } else {
                        await afterAction()
                    }
                }
                span.style.display='none'
                button.style.display="block"
            }
        };

        const resize = (e) => {
            const textarea = e.target
            textarea.style.height = '1px'
            textarea.style.height = (12+textarea.scrollHeight) +'px'
        }

        return (
            <>
            {this.props.permission ? (
                <div className='w-full h-full bg-transparent'>
                    <button className='w-full h-full font-semibold border-2 border-transparent hover:border-gray-300 rounded-lg' style={{display:'block',textAlign:textAlign}} onClick={OnClick}>{this.props.name}</button>
                    <form className='w-full h-full' style={{display:'none'}}>
                        <textarea required onKeyUp={resize} onKeyDownCapture={resize} className={['w-full h-full bg-transparent p-1 border-b-2 border-gray-600 text-center resize-none overflow-auto break-words',textareaClassName].join(' ')} name={this.props.dataType} onKeyDown={OnSubmit} placeholder={this.props.placeholder || capitalize(this.props.dataType)}></textarea>
                    </form>
                    <span className="text-center font-semibold" style={{display:'none'}}>Loading...</span>
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