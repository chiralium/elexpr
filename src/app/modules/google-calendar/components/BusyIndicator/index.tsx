import './style.less';

import React, { useEffect, useMemo } from 'react';
import block from 'bem-cn';
import { UnicodePreloader } from 'app/components/UnicodePreloader';
import { GoogleCalendarServices } from 'app/modules/google-calendar/services';
import { RequestWrapper } from 'app/modules/request/components/RequestWrapper';
import { getBusyTime, GOOGLE_CALENDAR_MODULE } from 'app/modules/google-calendar/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { TRootState } from 'app/store';
import { getFirstAndLastMonthDays } from 'app/helpers';
import { selectBusyTimeList } from 'app/modules/google-calendar/selectors';
import { type IGoogleCalendarBusyItem } from 'app/modules/google-calendar/models';

const b = block('busy-indicator');

export const BusyIndicator = () => {
    const dispatch = useDispatch<ThunkDispatch<TRootState, { googleServices: GoogleCalendarServices }, any>>();
    const busyTimeList = useSelector<TRootState, Array<IGoogleCalendarBusyItem>>(selectBusyTimeList);

    useEffect(() => {
        const [timeMin, timeMax] = getFirstAndLastMonthDays();

        dispatch(getBusyTime(timeMax, timeMin));
    }, []);

    const isBusy = useMemo<boolean>(() => {
        // const _mocked = '2022-06-22T10:12:00+03:00'

        const now = new Date();
        const [day] = now.toISOString().split('T');

        const calendarDayList = busyTimeList.filter(busyTimeItem => {
            const [busyTimeDay] = busyTimeItem.start.split('T');
            return busyTimeDay === day
        });

        if (!calendarDayList.length) {
            return false;
        }

        return Boolean(calendarDayList.find(calendarDayItem => {
            return new Date(calendarDayItem.start).getTime() <= now.getTime() &&
                now.getTime() <= new Date(calendarDayItem.end).getTime();
        }));
    }, [busyTimeList]);

    const renderLabel = useMemo<string>(() => {
        return isBusy ? 'busy right now' : 'currently online'
    }, [isBusy]);

    return <div className={b()}>
        <RequestWrapper name={GOOGLE_CALENDAR_MODULE} preloader={
            <div className={b('preloader')}>
                <UnicodePreloader/>
            </div>
        }>
            <div className={b('indicator', { busy: isBusy, online: !isBusy })}>
                <UnicodePreloader /> {renderLabel} <UnicodePreloader />
            </div>
        </RequestWrapper>
    </div>
}
