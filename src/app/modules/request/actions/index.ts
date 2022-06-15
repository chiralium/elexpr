import { makeAction } from 'app/helpers';
import { TAction } from 'src/types';

export type TRequestPayload<P = any> = {
    moduleName: string,
    payload: P,
}

export const REQUEST_MODULE = 'REQUEST_MODULE';

export const REQUEST_ACTIONS = makeAction(REQUEST_MODULE, {
    LOADING: 'LOADING',
    ERROR: 'ERROR'
});

export const setLoading = (payload: TRequestPayload<boolean>): TAction<TRequestPayload<boolean>> => ({
    payload,
    type: REQUEST_ACTIONS.LOADING
});

export const setError = (payload: TRequestPayload<string>): TAction<TRequestPayload<string>> => ({
    payload,
    type: REQUEST_ACTIONS.ERROR
});
