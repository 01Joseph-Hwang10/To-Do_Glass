import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

// const initialState = {};

const middleware = [thunk];

const saveToLocalStorage = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state',serializedState)
  } catch(error) {
    console.error(error)
  }
}

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null ) return {}
    return JSON.parse(serializedState)
  } catch (error) {
    console.error(error)
    return {}
  }
}

const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

store.subscribe(()=>saveToLocalStorage(store.getState()))


export default store;