import { makeAction } from 'app/helpers';
import { TAction } from 'src/types';

export const LOGGER_MODULE = 'LOGGER_MODULE';

export const LOGGER_ACTIONS = makeAction(LOGGER_MODULE, {
    SET_ACTION: 'SET_ACTION'
});

export const setAction = (action: TAction): TAction<TAction> => {
    return {
        payload: action,
        type: LOGGER_ACTIONS.SET_ACTION
    }
};
