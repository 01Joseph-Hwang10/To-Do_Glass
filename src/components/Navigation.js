// React
import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Redux
import {Logout} from '../actions/useractions/authActions';
import {checkPlace,hideNavAfterLogout} from '../actions/navControl';
import {deleteProfileAfterLogout} from '../actions/useractions/userInfoActions';
// etc
import {PropTypes} from 'prop-types';
import {switchDisplay} from '../functions/switchDisplay';
import Avatar from '../mixins/user/Avatar';
import { COLOR_FIRST, COLOR_FOURTH } from '../store/variables';

class Navigation extends React.Component {

    componentDidMount() {
        this.props.checkPlace()
    }

    componentWillUpdate() {
        this.props.checkPlace()
    }

    render() {

        const Logout = () => {
            this.props.Logout();
            this.props.hideNavAfterLogout();
            this.props.deleteProfileAfterLogout();
        }

        let user;
        let userInfo = this.props.Profile.data
        if(userInfo) {
            userInfo['id'] = userInfo.url.split('/').filter(Boolean).reverse()[0]
            user = userInfo
        }

        return (
            <div id="navigation" className="w-full border-b fixed top-0 p-2 px-5 flex-col justify-between items-center z-10" style={{display:'block',backgroundColor:COLOR_FIRST}}>
                <div className="w-5/12 float-left flex justify-start items-center mt-1">
                    <Link to='/'><i className="text-2xl text-white font-bold" style={{fontFamily:"Brush Script MT, Brush Script Std, cursive",color:COLOR_FOURTH}}>FLglance</i></Link>
                </div>
                <div className="w-5/12 float-right flex justify-end items-center">
                    <div>
                        {
                            user ? (
                                <div className="px-3 py-1 rounded border border-gray-200 mr-3 text-white">
                                    <Avatar user={user}/>
                                </div>
                            ) : (
                                <span></span>
                            )
                        }
                    </div>
                    <div className="relative flex items-center">
                        <button className="far fa-caret-square-down text-gray-600 text-2xl" style={{color:COLOR_FOURTH}} onClick={switchDisplay}></button>
                        <div className="absolute bg-white w-20 right-1 top-7 border p-2 rounded" style={{display:'none'}}>
                            <button onClick={Logout}>Log out</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const actions={Logout, checkPlace, 
    hideNavAfterLogout, deleteProfileAfterLogout};

const mapStateToProps = state => {
    return {
        Profile:state.userInfo.Profile
    }
}

Navigation.propTypes = {
    Logout:PropTypes.func.isRequired,
    checkPlace:PropTypes.func.isRequired,
    hideNavAfterLogout:PropTypes.func.isRequired,
    deleteProfileAfterLogout:PropTypes.func.isRequired,
}

export default connect(mapStateToProps,actions)(Navigation);
