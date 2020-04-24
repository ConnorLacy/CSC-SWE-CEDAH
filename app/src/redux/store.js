import { createStore, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers/index';

const loggerMiddleware = createLogger()

const configureStore = (persistedState) => {
 return createStore(
   reducer,
   persistedState,
   applyMiddleware(thunk, loggerMiddleware)
 );
}

export default configureStore;