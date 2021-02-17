import React from 'react'
import { connect } from 'react-redux';
import { COLOR_FIRST } from '../../store/variables';

function Footer(props) {

    const paddingBottom = (function(){return(!props.onLanding&&props.screenSize<1024?"6rem":"2.5rem")})()

    return (
        <div className="flex justify-center items-center border-t py-10 border-t-2" style={{backgroundColor:COLOR_FIRST,paddingBottom:paddingBottom}}>
            <div className="flex flex-col justify-center items-center space-y-1">
                <span className="font-semibold text-lg text-gray-400">2021 FLGlance, © All Right Reserved</span>
                <span className="text-gray-400 text-sm">Contact: joseph95501@gmail.com</span>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        onLanding:state.onLanding.onLanding,
        screenSize:state.screen.screenSize
    }
}


export default connect(mapStateToProps,null)(Footer);
