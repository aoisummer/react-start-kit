import './main.css';

import 'core-js/es/map';
import 'core-js/es/set';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';

function App() {
    React.useEffect(() => {
        (async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('next.');
        })().catch(console.error);
    }, []);

    return (
        <div>
            <span className="logo"></span>
            <span>Hello world.</span>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
