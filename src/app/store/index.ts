import { THEME_REDUCER, themeReducer, TThemeState } from 'app/modules/theme/reducer';
import { combineReducers, createStore, applyMiddleware, compose, Store } from 'redux';
import thunk from 'redux-thunk';
import { ThemeServices } from 'app/modules/theme/services';
import { GithubService } from 'app/modules/github/services';
import { GITHUB_REDUCER, githubReducer, TGithubState } from 'app/modules/github/reducers';

export type TRootState = {
    [THEME_REDUCER]: TThemeState,
    [GITHUB_REDUCER]: TGithubState;
};

const rootReducer = combineReducers({
    [THEME_REDUCER]: themeReducer,
    [GITHUB_REDUCER]: githubReducer
});

export const extraArgs = {
    themeService: new ThemeServices(),
    githubService: new GithubService()
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
