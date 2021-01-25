// Redux
import { combineReducers } from 'redux';
import containerReducer from './containerReducer';
// Reducers
import navReducer from './navReducer';
import permissionReducer from './permissionReducer';
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
    permission:permissionReducer,
    container:containerReducer
});
