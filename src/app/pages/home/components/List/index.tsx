import './style.less';

import React from 'react';
import block from 'bem-cn';

const b = block('home');

export const List = () => {
    return <main className={b()}>
        <nav>
            <ul className={b('nav')}>
                <li className={b('nav-item')}>
                    Pet
                </li>
                <li className={b('nav-item')}>
                    Jobs
                </li>
                <li className={b('nav-item')}>
                    About
                </li>
            </ul>
        </nav>
    </main>
}
