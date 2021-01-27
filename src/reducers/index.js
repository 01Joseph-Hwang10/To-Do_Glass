// Redux
import { combineReducers } from 'redux';
import containerReducer from './containerReducer';
import glanceReducer from './glanceReducer';
// Reducers
import navReducer from './navReducer';
import projectReducer from './projectReducer';
import signInReducer from './signInReducer';
import signUpReducer from './signUpReducer';
import userInfoReducer from './userInfoReducer';


export default combineReducers({
    login:signInReducer,
    signUp:signUpReducer,
    onLanding:navReducer,
    userInfo:userInfoReducer,
    project:projectReducer,
    container:containerReducer,
    glance:glanceReducer
});
