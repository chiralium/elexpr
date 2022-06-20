import { Middleware } from 'redux';
import { LOGGER_ACTIONS, setAction } from 'app/modules/logger/actions';

export const loggerMiddleware: Middleware = _ => next => action => {
    if (!Object.values(LOGGER_ACTIONS).includes(action.type)) {
        next(setAction(action));
    }

    return next(action);
}
