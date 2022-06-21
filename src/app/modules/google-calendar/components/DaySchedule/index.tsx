import './style.less';

import React, { useCallback } from 'react';
import block from 'bem-cn';
import { createDayTimeLine, TDayTimeLine, isBusyTime } from 'app/helpers';
import { useSelector } from 'react-redux';
import { selectBusyTimeList } from 'app/modules/google-calendar/selectors';
import { IGoogleCalendarBusyItem } from 'app/modules/google-calendar/models';

const b = block('day-schedule');

type TProps = {
    date: string;
}

const now = new Date();
const dayTimeLine: TDayTimeLine = createDayTimeLine(now);
console.log(dayTimeLine);

export const DaySchedule: React.FC<TProps> = ({ date }) => {
    const busyTime = useSelector(selectBusyTimeList);

    const isBusy = useCallback((date: Date, busyTime: IGoogleCalendarBusyItem[]) => {
        return isBusyTime(date, busyTime);
    }, [busyTime]);

    return <div className={b()}>
        <div className={b('controls')}>
            <button className={b('control', { prev: true })}>◀</button>
            <div className={b('title')}>
                {date}
            </div>
            <button className={b('control', { next: true })}>▶</button>
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
                <div className={b('space')}/>
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
