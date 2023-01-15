import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import './style/style.scss';
import store from './app/store';
import {Provider} from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

window.addEventListener('message', e => {
    if (process.env.NODE_ENV !== 'production' && e.data && e.data.type === 'webpackInvalid') {
        console.clear();
    }
});
