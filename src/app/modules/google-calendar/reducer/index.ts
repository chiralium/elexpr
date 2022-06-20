import { GoogleCalendarFreeBusyResponse } from 'app/modules/google-calendar/models';
import { TAction } from 'src/types';
import { GOOGLE_CALENDAR_ACTIONS } from 'app/modules/google-calendar/actions';

export type TGoogleCalendarState = {
    busyTime?: GoogleCalendarFreeBusyResponse;
}

const intialState: TGoogleCalendarState = {};

export const googleCalendarReducer = (state = intialState, action: TAction): TGoogleCalendarState => {
    switch (action.type) {
        case GOOGLE_CALENDAR_ACTIONS.SET_BUSY_TIME: {
            return {
                ...state,
                busyTime: action.payload
            };
        }

        default:
            return state;
    }
}
