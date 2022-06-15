import { type TRootState } from 'app/store';
import { type TThemeState } from 'app/modules/theme/reducer';
import { THEME_MODULE } from 'app/modules/theme/actions';

export const selectTheme = (state: TRootState): TThemeState => {
    return state[THEME_MODULE];
}
