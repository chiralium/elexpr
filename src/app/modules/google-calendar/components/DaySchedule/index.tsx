import './style.less';

import React, { useCallback, useEffect, useState } from 'react';
import block from 'bem-cn';
import { createDayTimeLine, formatDate, isBusyTime, TDayTimeLine } from 'app/helpers';
import { useSelector } from 'react-redux';
import { selectBusyTimeList } from 'app/modules/google-calendar/selectors';
import { IGoogleCalendarBusyItem } from 'app/modules/google-calendar/models';

const b = block('day-schedule');

const now = new Date();

export const DaySchedule: React.FC = () => {
    const busyTime = useSelector(selectBusyTimeList);
    const [day, setDay] = useState<Date>(now);
    const [dayTimeLine, setDayTimeLine] = useState<TDayTimeLine>(createDayTimeLine(now));

    const handleNextDay = () => {
        setDay(prevState => {
            return new Date(new Date().setDate(prevState.getDate() + 1));
        });
    }

    const handlePrevDay = () => {
        setDay(prevState => {
            return new Date(new Date().setDate(prevState.getDate() - 1));
        });
    }

    useEffect(() => {
        setDayTimeLine(createDayTimeLine(day))
    }, [day]);

    const isBusy = useCallback((date: Date, busyTime: IGoogleCalendarBusyItem[]) => {
        return isBusyTime(date, busyTime);
    }, [busyTime]);

    return <div className={b()}>
        <div className={b('controls')}>
            <button className={b('control', { prev: true })} onClick={handlePrevDay}>◀</button>
            <div className={b('title')}>
                {formatDate(day.toISOString())}
            </div>
            <button className={b('control', { next: true })} onClick={handleNextDay}>▶</button>
        </div>
        <div className={b('content')}>
            <div className={b('calendar')}>
                <div className={b('hours')}>
                    {dayTimeLine.hoursList.map(hour => (
                        <div className={b('hour')} key={`${hour}_hour`}>
                            {hour}<sup>00</sup>
                        </div>
                    ))}
                </div>
                <div className={b('space')}>HH<sup>mm</sup></div>
                <div className={b('minutes')}>
                    {dayTimeLine.minutesList.map(minute => (
                        <div key={`${minute}_minute`} className={b('minute')}>
                            --<sup>{minute}</sup>
                        </div>
                    ))}
                </div>
                <div className={b('markers')} >
                    {dayTimeLine.fullDateList.map(date => {
                        const isTimeBusy = isBusy(date, busyTime);

                        return <div title={isTimeBusy ? 'Busy' : 'Not busy'} key={date.getTime()} className={b('marker', {
                            busy: isTimeBusy,
                            online: !isTimeBusy
                        })}/>
                    })}
                </div>
            </div>
        </div>
    </div>;
}
