import { TAction } from 'src/types';
import { LOGGER_ACTIONS } from 'app/modules/logger/actions';

export type TLoggerState = {
    action: TAction | null;
}

const initialState: TLoggerState = {
    action: null
}

export const loggerReducer = (state = initialState, action: TAction): TLoggerState => {
    switch (action.type) {
        case LOGGER_ACTIONS.SET_ACTION: {
            return {
                ...state,
                action: action.payload
            }
        }

        default: {
            return state;
        }
    }
}
