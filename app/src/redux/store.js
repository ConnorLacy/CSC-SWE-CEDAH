import { createStore, applyMiddleware, compose } from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers/index';

const loggerMiddleware = createLogger()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (persistedState) => {
 return createStore(
   reducer,
   persistedState,
   composeEnhancers(
     applyMiddleware(thunk, loggerMiddleware)
   )
 );
}

export default configureStore;