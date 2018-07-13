import 'babel-polyfill';
import 'raf/polyfill';
import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <div>Hello world.</div>,
    document.querySelector('#root')
);
