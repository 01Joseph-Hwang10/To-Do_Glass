// Redux
import { combineReducers } from 'redux';
// Reducers
import signInReducer from './signInReducer';
import signUpReducer from './signUpReducer';


export default combineReducers({
    login:signInReducer,
    signUp:signUpReducer
});
