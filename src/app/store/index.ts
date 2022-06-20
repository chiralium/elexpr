import { themeReducer, TThemeState } from 'app/modules/theme/reducer';
import { combineReducers, createStore, applyMiddleware, compose, Store } from 'redux';
import thunk from 'redux-thunk';
import { ThemeServices } from 'app/modules/theme/services';
import { GithubService } from 'app/modules/github/services';
import { githubReducer, TGithubState } from 'app/modules/github/reducers';
import { THEME_MODULE } from 'app/modules/theme/actions';
import { GITHUB_MODULE } from 'app/modules/github/actions';
import { REQUEST_MODULE } from 'app/modules/request/actions';
import { requestReducer, TRequestState } from 'app/modules/request/reducer';
import { LOGGER_MODULE } from 'app/modules/logger/actions';
import { loggerReducer, TLoggerState } from 'app/modules/logger/reducer';
import { loggerMiddleware } from 'app/modules/logger/middleware';
import { GOOGLE_CALENDAR_MODULE } from 'app/modules/google-calendar/actions';
import { googleCalendarReducer, TGoogleCalendarState } from 'app/modules/google-calendar/reducer';
import { GoogleCalendarServices } from 'app/modules/google-calendar/services';

export type TRootState = {
    [THEME_MODULE]: TThemeState,
    [REQUEST_MODULE]: TRequestState,
    [LOGGER_MODULE]: TLoggerState,
    [GOOGLE_CALENDAR_MODULE]: TGoogleCalendarState,
    [GITHUB_MODULE]: TGithubState;
};

const rootReducer = combineReducers({
    [THEME_MODULE]: themeReducer,
    [REQUEST_MODULE]: requestReducer,
    [LOGGER_MODULE]: loggerReducer,
    [GITHUB_MODULE]: githubReducer,
    [GOOGLE_CALENDAR_MODULE]: googleCalendarReducer
});

export const extraArgs = {
    themeService: new ThemeServices(),
    githubService: new GithubService(),
    googleCalendarServices: new GoogleCalendarServices()
};

const middleWareList = [
    thunk.withExtraArgument(extraArgs),
    loggerMiddleware
];

export const createAppStore = (): Store => {
    return createStore(
        rootReducer,
        {},
        compose(applyMiddleware(...middleWareList))
    )
}
