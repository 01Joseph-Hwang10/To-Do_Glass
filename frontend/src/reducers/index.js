// Redux
import { combineReducers } from 'redux';
// Reducers
import navReducer from './navReducer';
import containerReducer from './todoreducer/containerReducer';
import projectReducer from './todoreducer/projectReducer';
import screenReducer from './screenReducer';
import signInReducer from './userreducer/signInReducer';
import signUpReducer from './userreducer/signUpReducer';
import glanceReducer from './todoreducer/glanceReducer';
import userInfoReducer from './userreducer/userInfoReducer';
import taskReducer from './todoreducer/taskReducer';
import tagReducer from './todoreducer/tagReducer';
import followManageReducer from './socialreducer/followManageReducer';


export default combineReducers({
    login:signInReducer,
    signUp:signUpReducer,
    onLanding:navReducer,
    userInfo:userInfoReducer,
    project:projectReducer,
    tag:tagReducer,
    container:containerReducer,
    task:taskReducer,
    glance:glanceReducer,
    screen:screenReducer,
    follow:followManageReducer,
});
