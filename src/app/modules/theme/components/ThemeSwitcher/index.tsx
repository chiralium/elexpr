import './style.less';

import React, { useMemo } from 'react';
import block from 'bem-cn';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from 'app/modules/theme/selectors';
import { type TRootState } from 'app/store';
import { SlideSwitch } from 'app/components/SlideSwitch';
import { changeColorTheme } from 'app/modules/theme/actions';
import { ThunkDispatch } from 'redux-thunk';
import { type ThemeServices } from 'app/modules/theme/services';
import { TAction } from 'src/types';

const b = block('theme-switcher');

export const ThemeSwitcher = () => {
    const dispatch = useDispatch<ThunkDispatch<TRootState, { themeService: ThemeServices }, TAction>>();
    const theme = useSelector<TRootState>(selectTheme);

    const handleThemeChangeClick = (isOn: boolean) => {
        if (isOn) {
            document.documentElement.setAttribute('data-theme', 'alt');
            dispatch(changeColorTheme('alt'));
            return;
        }

        document.documentElement.removeAttribute('data-theme');
        dispatch(changeColorTheme('default'));
    }

    const themeIndicator = useMemo<string>(() => {
        return theme === 'default' ? '🌚' : '🌝';
    }, [theme]);

    return <div className={b()}>
        {themeIndicator}<SlideSwitch onClick={handleThemeChangeClick}/>
    </div>
}
