import { Middleware } from 'redux';
import { setAction } from 'app/modules/logger/actions';

export const loggerMiddleware: Middleware = _ => next => action => {
    next(setAction(action));
    return next(action);
}
