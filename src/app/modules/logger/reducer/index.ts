import { TAction } from 'src/types';
import { LOGGER_ACTIONS } from 'app/modules/logger/actions';

export type TLoggerState = {
    actions: Set<string>,
}

const initialState: TLoggerState = {
    actions: new Set<string>()
}

export const loggerReducer = (state = initialState, action: TAction): TLoggerState => {
    switch (action.type) {
        case LOGGER_ACTIONS.SET_ACTIONS: {
            const newActionSet = new Set<string>(state.actions);
            newActionSet.add(action.payload.type);

            return {
                ...state,
                actions: newActionSet
            }
        }

        case LOGGER_ACTIONS.CLEAR_ACTIONS: {
            return {
                ...state,
                actions: new Set<string>()
            }
        }

        default: {
            return state;
        }
    }
}
