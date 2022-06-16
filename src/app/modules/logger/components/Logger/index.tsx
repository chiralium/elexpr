import './style.less';

import React, { useEffect, useState } from 'react';
import block from 'bem-cn';
import { UnicodePreloader } from 'app/components/UnicodePreloader';
import { selectAction } from 'app/modules/logger/selector';
import { useSelector } from 'react-redux';

const b = block('logger');

export const Logger = () => {
    const action = useSelector(selectAction);
    const [isClear, setIsClear] = useState(false);

    useEffect(() => {
        if (!action) {
            return;
        }

        setIsClear(false);
        setTimeout(() => {
            setIsClear(true);
        }, 1000);
    }, [action]);

    return <div className={b({ 'no-action': isClear })}>
        {!isClear &&
            <div className={b('flex-item')}>
                <pre className={b('pre')}>
                    {action?.type}
                </pre>
            </div>
        }
        <div className={b('flex-item')}>
            <UnicodePreloader/>
        </div>
    </div>
}
