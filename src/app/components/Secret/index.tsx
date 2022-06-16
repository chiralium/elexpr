import './style.less';

import React from 'react';
import block from 'bem-cn';
import { UnicodePreloader } from 'app/components/UnicodePreloader';

const b = block('secret');

export const Secret = () => {
    return <div className={b()}>
        <UnicodePreloader/>
    </div>
}
