import '@babel/polyfill';
import 'raf/polyfill';
import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <div>
        <span className="logo"></span>
        <span>Hello world.</span>
    </div>,
    document.querySelector('#root')
);
