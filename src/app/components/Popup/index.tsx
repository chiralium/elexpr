import './style.less';

import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import block from 'bem-cn';

const b = block('popup');

type TProps<E extends HTMLElement> = {
    children: ReactNode,
    targetNode: E | null;
    delay?: number;
}

export const Popup = <E extends HTMLElement>({ children, targetNode, delay = 500 }: TProps<E>) => {
    const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [visible, setVisible] = useState<boolean>(false);

    const handleMouseLeave = useCallback(() => {
        timerId.current = setTimeout(() => {
            setVisible(false);
        }, delay);
    }, [delay]);

    const handleMouseOver = useCallback(() => {
        if (!timerId) {
            return;
        }

        clearTimeout(timerId.current!);
        setVisible(true);
    }, [delay]);

    useEffect(() => {
        if (!targetNode) {
            return;
        }

        targetNode.addEventListener('mouseover', handleMouseOver);
        targetNode.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            targetNode.removeEventListener('mouseover', handleMouseOver);
            targetNode.removeEventListener('mouseleave', handleMouseLeave);
        }
    }, [targetNode, handleMouseOver]);

    return <div className={b()}>
        <div className={b('tooltip', { visible })}>
            {children}
        </div>
    </div>
}
