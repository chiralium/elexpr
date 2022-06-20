import './style.less';

import React from 'react';
import block from 'bem-cn';
import { ThemeSwitcher } from 'app/modules/theme/components/ThemeSwitcher';
import { LastCommit } from 'app/modules/github/components/LastCommit';
import { BusyIndicator } from 'app/modules/google-calendar/components/BusyIndicator';

const b = block('header');

export const Header = () => {
    return <header className={b()}>
        <ThemeSwitcher/>
        <BusyIndicator/>
        <LastCommit/>
    </header>
};
