import { THEME_REDUCER, themeReducer, TThemeState } from 'app/modules/theme/reducer';
import { combineReducers, createStore, applyMiddleware, compose, Store } from 'redux';
import thunk from 'redux-thunk';
import { ThemeServices } from 'app/modules/theme/services';

export type TRootState = {
    [THEME_REDUCER]: TThemeState;
};

const rootReducer = combineReducers({
    [THEME_REDUCER]: themeReducer
});

export const extraArgs = {
    themeService: new ThemeServices()
};

const middleWareList = [
    thunk.withExtraArgument(extraArgs)
];

export const createAppStore = (): Store => {
    return createStore(
        rootReducer,
        {},
        compose(applyMiddleware(...middleWareList))
    )
}
