import './style.less';

import React, { ReactNode } from 'react';
import block from 'bem-cn';

const b = block('container');

type TProps = {
    children: ReactNode;
}

export const Container: React.FC<TProps> = ({ children }) => {
    return <div className={b()}>
        {children}
    </div>
};
