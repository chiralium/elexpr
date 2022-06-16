import './style.less';

import React from 'react';
import block from 'bem-cn';

const b = block('unicode-preloader');

export const UnicodePreloader = () => {
    return <div className={b()}/>
}
