import { makeAction } from 'app/helpers';
import { type TAction } from 'src/types';
import { ThunkAction } from 'redux-thunk';
import { TRootState } from 'app/store';
import { ThemeServices } from 'app/modules/theme/services';

export const THEME_MODULE = 'THEME_MODULE';

export const THEME_ACTIONS = makeAction(THEME_MODULE, {
    SET_THEME: 'SET_THEME'
});

export const setTheme = (theme: 'alt' | 'default'): TAction<'alt' | 'default'> => {
    return {
        payload: theme,
        type: THEME_ACTIONS.SET_THEME
    }
}

export const changeColorTheme = (theme: 'alt' | 'default'): ThunkAction<Promise<void>, TRootState, { themeService: ThemeServices }, TAction> => {
    return async (dispatch, __, { themeService }) => {
        dispatch(setTheme(theme));
        themeService.changeColorTheme(theme);
    }
}
