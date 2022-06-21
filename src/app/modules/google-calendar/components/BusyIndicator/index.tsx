import './style.less';

import React, { useEffect, useMemo, useRef } from 'react';
import block from 'bem-cn';
import { UnicodePreloader } from 'app/components/UnicodePreloader';
import { GoogleCalendarServices } from 'app/modules/google-calendar/services';
import { RequestWrapper } from 'app/modules/request/components/RequestWrapper';
import { getBusyTime, GOOGLE_CALENDAR_MODULE } from 'app/modules/google-calendar/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { TRootState } from 'app/store';
import { getFirstAndLastMonthDays, formatDate, isBusyTime } from 'app/helpers';
import { selectBusyTimeList } from 'app/modules/google-calendar/selectors';
import { type IGoogleCalendarBusyItem } from 'app/modules/google-calendar/models';
import { Popup } from 'app/components/Popup';
import { DaySchedule } from 'app/modules/google-calendar/components/DaySchedule';

const b = block('busy-indicator');
const now = new Date();

export const BusyIndicator = () => {
    const targetNodeRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<ThunkDispatch<TRootState, { googleServices: GoogleCalendarServices }, any>>();
    const busyTimeList = useSelector<TRootState, Array<IGoogleCalendarBusyItem>>(selectBusyTimeList);

    useEffect(() => {
        const [timeMin, timeMax] = getFirstAndLastMonthDays();

        dispatch(getBusyTime(timeMax, timeMin));
    }, []);

    const isBusy = useMemo<boolean>(() => {
        return isBusyTime(now, busyTimeList)
    }, [busyTimeList]);

    const renderLabel = useMemo<string>(() => {
        return isBusy ? 'busy right now' : 'currently online'
    }, [isBusy]);

    return <div className={b()} ref={targetNodeRef}>
        <RequestWrapper name={GOOGLE_CALENDAR_MODULE} preloader={
            <div className={b('preloader')}>
                <UnicodePreloader/>
            </div>
        }>
            <div className={b('indicator', { busy: isBusy, online: !isBusy })}>
                <UnicodePreloader /> {renderLabel} <UnicodePreloader />
            </div>
        </RequestWrapper>
        <Popup targetNode={targetNodeRef.current}>
            <DaySchedule date={formatDate(now.toISOString())}/>
        </Popup>
    </div>
}
