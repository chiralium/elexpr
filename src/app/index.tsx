import 'src/styles/main.less';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from 'app/components/App';
import { Provider } from 'react-redux';
import { ReduxStoreService } from 'app/services';
import { createAppStore } from 'app/store';

(() => {
    const root = document.querySelector('#root');
    const splash = document.querySelector('#splash');

    if (!root) {
        return;
    }

    const reactRoot = createRoot(root);
    ReduxStoreService.reduxStore = createAppStore();

    new Promise(resolve => {
        reactRoot.render(
            <Provider store={ReduxStoreService.reduxStore}>
                <App/>
            </Provider>
        );

        resolve(null);
    }).then(() => {
        console.log(splash);
        splash?.remove();
    })
})();
