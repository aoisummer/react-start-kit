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

(async function () {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('next.');
})().catch(console.error);
