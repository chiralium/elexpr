import { makeAction } from 'app/helpers';
import { GoogleCalendarFreeBusyResponse } from 'app/modules/google-calendar/models';
import { TAction, TAsyncAction } from 'src/types';
import { GoogleCalendarServices } from 'app/modules/google-calendar/services';
import { setError, setLoading } from 'app/modules/request/actions';

export const GOOGLE_CALENDAR_MODULE = 'GOOGLE_CALENDAR_MODULE';

export const GOOGLE_CALENDAR_ACTIONS = makeAction(GOOGLE_CALENDAR_MODULE, {
    SET_BUSY_TIME: 'SET_BUSY_TIME'
});

export const setBusyTime = (busyTime: GoogleCalendarFreeBusyResponse): TAction<GoogleCalendarFreeBusyResponse> => {
    return {
        payload: busyTime,
        type: GOOGLE_CALENDAR_ACTIONS.SET_BUSY_TIME
    };
};

export const getBusyTime = (timeMin: string, timeMax: string): TAsyncAction<GoogleCalendarServices> => {
    return async (dispatch, __, { googleCalendarServices }) => {
        dispatch(
            setLoading({
                moduleName: GOOGLE_CALENDAR_MODULE,
                payload: true
            })
        );

        try {
            const busyTime = await googleCalendarServices.getFreeBusy(timeMin, timeMax);
            dispatch(setBusyTime(busyTime));
            dispatch(
                setLoading({
                    moduleName: GOOGLE_CALENDAR_MODULE,
                    payload: false
                })
            );
        } catch (e) {
            setError({
                moduleName: GOOGLE_CALENDAR_MODULE,
                payload: String(e)
            })
        }
    }
}
