import { TAction } from 'src/types';
import { THEME_ACTIONS } from 'app/modules/theme/actions';

export type TThemeState = 'alt' | 'default';

const initialState: TThemeState = 'default';

export const themeReducer = (state = initialState, action: TAction): TThemeState => {
    console.log(action);
    switch (action.type) {
        case THEME_ACTIONS.SET_THEME: {
            return action.payload
        }

        default:
            return state;
    }
}
