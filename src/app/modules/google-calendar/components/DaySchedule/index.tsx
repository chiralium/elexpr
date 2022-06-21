import './style.less';

import React from 'react';
import block from 'bem-cn';
import { createDayTimeLine, TDayTimeLine } from 'app/helpers';

const b = block('day-schedule');

type TProps = {
    date: string;
}

const dayTimeLine: TDayTimeLine = createDayTimeLine(new Date());
console.log(dayTimeLine);

export const DaySchedule: React.FC<TProps> = ({ date }) => {
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
                <div className={b('markers')}>
                    {Array.from({ length: 6 * 12 }, (_, i) => i).map(i => (
                        <div key={i} className={b('marker')}/>
                    ))}
                </div>
            </div>
        </div>
    </div>;
}
