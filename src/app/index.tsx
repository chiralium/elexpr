import React from 'react';
import { createRoot } from 'react-dom/client';

(() => {
    const root = document.querySelector('#root');

    if (!root) {
        return;
    }

    const reactRoot = createRoot(root);

    reactRoot.render(
        <div>Hello world!!!</div>
    )
})()
