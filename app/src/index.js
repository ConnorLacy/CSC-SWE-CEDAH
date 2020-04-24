import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {loadState, saveState} from './redux/localStorage';
import configureStore from './redux/store';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

const persistedState = loadState();
const store = configureStore(persistedState)

store.subscribe(() => {
    saveState(store.getState())
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
