import './style.less';

import React, { useState, KeyboardEvent, useEffect } from 'react';
import block from 'bem-cn';

const b = block('slide-switch');

type TProps = {
    onClick: (state: boolean) => void;
    className?: string;
}

export const SlideSwitch: React.FC<TProps> = ({ onClick, className }) => {
    const [isOn, setIsOn] = useState(false);

    const handleClick = () => {
        setIsOn(prevState => !prevState);
    };

    useEffect(() => {
        onClick(isOn);
    }, [isOn]);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const { keyCode } = event as KeyboardEvent;
        if (Number(keyCode) === 13 || Number(keyCode) === 32) {
            handleClick();
        }
    }

    return <div className={b()} onClick={handleClick} onKeyDown={handleKeyDown} role="button" tabIndex={0}>
        <div className={b('slider', { off: isOn })}/>
    </div>
}
