// Redux
import { combineReducers } from 'redux';
import containerReducer from './containerReducer';
// Reducers
import navReducer from './navReducer';
import projectReducer from './projectReducer';
import screenReducer from './screenReducer';
import signInReducer from './signInReducer';
import signUpReducer from './signUpReducer';
import glanceReducer from './glanceReducer';
import userInfoReducer from './userInfoReducer';


export default combineReducers({
    login:signInReducer,
    signUp:signUpReducer,
    onLanding:navReducer,
    userInfo:userInfoReducer,
    project:projectReducer,
    container:containerReducer,
    glance:glanceReducer,
    screen:screenReducer
});
