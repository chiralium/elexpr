import { TRootState } from 'app/store';
import { TLoggerState } from 'app/modules/logger/reducer';
import { LOGGER_MODULE } from 'app/modules/logger/actions';
import { TAction } from 'src/types';

const selectModule = (state: TRootState): TLoggerState => {
    return state[LOGGER_MODULE];
}

export const selectAction = (state: TRootState): TAction | null => {
    return selectModule(state).action;
}
