import './style.less';

import React from 'react';
import block from 'bem-cn';
import { Container } from 'app/components/Container';

const b = block('home');

export const List = () => {
    return <Container>
        <main className={b()}>
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
    </Container>
}
