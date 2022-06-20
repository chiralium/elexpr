import { makeAction } from 'app/helpers';
import { TAction } from 'src/types';

export const LOGGER_MODULE = 'LOGGER_MODULE';

export const LOGGER_ACTIONS = makeAction(LOGGER_MODULE, {
    SET_ACTIONS: 'SET_ACTIONS',
    CLEAR_ACTIONS: 'CLEAR_ACTIONS'
});

export const setAction = (action: TAction): TAction<TAction> => {
    return {
        payload: action,
        type: LOGGER_ACTIONS.SET_ACTIONS
    }
};

export const clearActions = (): TAction<undefined> => {
    return {
        type: LOGGER_ACTIONS.CLEAR_ACTIONS
    }
}
