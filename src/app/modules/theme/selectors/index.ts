import { type TRootState } from 'app/store';
import { type TThemeState, THEME_REDUCER } from 'app/modules/theme/reducer';

export const selectTheme = (state: TRootState): TThemeState => {
    return state[THEME_REDUCER];
}
