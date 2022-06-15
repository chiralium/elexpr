import './style.less';

import React, { useMemo, useState } from 'react';
import block from 'bem-cn';
import { SlideSwitch } from 'app/components/SlideSwitch';

const b = block('header');

export const Header = () => {
    const [theme, setTheme] = useState('default');

    const handleThemeChangeClick = (isOn: boolean) => {
        if (isOn) {
            document.documentElement.setAttribute('data-theme', 'alt');
            setTheme('alt');
            return;
        }

        document.documentElement.removeAttribute('data-theme');
        setTheme('default');
    }

    const themeIndicator = useMemo<string>(() => {
        return theme === 'default' ? '🌚' : '🌝';
    }, [theme]);

    return <header className={b()}>
        <div className={b('theme-switcher')}>
            {themeIndicator}<SlideSwitch onClick={handleThemeChangeClick}/>
        </div>
    </header>
};
