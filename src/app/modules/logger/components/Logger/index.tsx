import './style.less';

import React, { useEffect, useRef, useState } from 'react';
import block from 'bem-cn';
import { UnicodePreloader } from 'app/components/UnicodePreloader';
import { selectActions } from 'app/modules/logger/selector';
import { useDispatch, useSelector } from 'react-redux';
import { clearActions } from 'app/modules/logger/actions';

const b = block('logger');

export const Logger = () => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const dispatch = useDispatch();
    const actionsList = useSelector(selectActions);
    const [pointer, setPointer] = useState(-1);

    useEffect(() => {
        if (pointer >= actionsList.size) {
            setPointer(-1);

            if (!timerRef.current) {
                return;
            }

            clearTimeout(timerRef.current);
            timerRef.current = null;

            dispatch(clearActions());
        }
    }, [pointer, actionsList]);

    useEffect(() => {
        if (!actionsList.size) {
            return;
        }

        timerRef.current = setInterval(() => {
            setPointer(prevState => prevState + 1);
        }, 350);

        return () => {
            if (!timerRef.current) {
                return;
            }

            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, [actionsList]);

    return <div className={b({ 'no-action': pointer < 0 })}>
        {pointer >= 0 &&
            <div className={b('flex-item')}>
                <pre className={b('pre')}>
                    {[...actionsList][pointer]}
                </pre>
            </div>
        }
        <div className={b('flex-item')}>
            <UnicodePreloader/>
        </div>
    </div>
}
