import { type TRootState } from 'app/store';
import { type TGoogleCalendarState } from 'app/modules/google-calendar/reducer';
import { GOOGLE_CALENDAR_MODULE } from 'app/modules/google-calendar/actions';
import { GoogleCalendarFreeBusyResponse, IGoogleCalendarBusyItem } from 'app/modules/google-calendar/models';

const selectModule = (state: TRootState): TGoogleCalendarState => {
    return state[GOOGLE_CALENDAR_MODULE];
}

export const selectBusyTime = (state: TRootState): GoogleCalendarFreeBusyResponse | undefined => {
    return selectModule(state).busyTime;
}

export const selectBusyTimeList = (state: TRootState): Array<IGoogleCalendarBusyItem> => {
    const busyTime = selectBusyTime(state);

    if (!busyTime) {
        return [];
    }

    const { calendars } = busyTime;

    return Object.keys(calendars).reduce((acc: Array<IGoogleCalendarBusyItem>, key: string) => {
        return [
            ...acc,
            ...calendars[key].busy
        ]
    }, []);
}
