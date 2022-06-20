import { TRootState } from 'app/store';
import { TLoggerState } from 'app/modules/logger/reducer';
import { LOGGER_MODULE } from 'app/modules/logger/actions';

const selectModule = (state: TRootState): TLoggerState => {
    return state[LOGGER_MODULE];
}

export const selectActions = (state: TRootState): Set<string> => {
    return selectModule(state).actions;
}
