import { TRootState } from 'app/store';
import { TRequestState } from 'app/modules/request/reducer';
import { REQUEST_MODULE } from 'app/modules/request/actions';

const selectModule = (state: TRootState): TRequestState => {
    return state[REQUEST_MODULE];
}

export const selectIsLoading = (moduleName: keyof TRootState, state: TRootState): boolean => {
    return selectModule(state)[moduleName]?.loading;
};

export const selectError = (moduleName: keyof TRootState, state: TRootState): string => {
    return selectModule(state)[moduleName]?.error;
};
