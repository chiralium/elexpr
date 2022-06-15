import { TAction } from 'src/types';
import { REQUEST_ACTIONS } from 'app/modules/request/actions';

export type TRequestState = {
    [key: string]: {
        error: string,
        loading: boolean,
    }
}

const initialState: TRequestState = {};

export const requestReducer = (state = initialState, action: TAction): TRequestState => {
    console.log(action);

    switch (action.type) {
        case REQUEST_ACTIONS.LOADING: {
            return {
                [action.payload.moduleName]: {
                    ...state[action.payload.moduleName],
                    loading: action.payload.payload
                }
            }
        }

        case REQUEST_ACTIONS.ERROR: {
            return {
                [action.payload.moduleName]: {
                    ...state[action.payload.moduleName],
                    error: action.payload.payload
                }
            }
        }

        default:
            return state;
    }
}
