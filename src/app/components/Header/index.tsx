import './style.less';

import React from 'react';
import block from 'bem-cn';
import { ThemeSwitcher } from 'app/modules/theme/components/ThemeSwitcher';

const b = block('header');

export const Header = () => {
    return <header className={b()}>
        <ThemeSwitcher/>
    </header>
};
