import React, { useEffect, useState } from 'react';
import { GradientText } from '../../utility/Formatted/GradientText';

type ToggleActionButtonProps = {
    onClickOne?: () => void;
    onClickTwo?: () => void;
    labelOne: string;
    colorOne?: string;
    labelTwo: string;
    colorTwo?: string;
    setOne?: boolean;
};

const ToggleActionButton: React.FC<ToggleActionButtonProps> = ({ setOne, onClickOne, onClickTwo, labelOne, labelTwo, colorOne = "#62B0D4", colorTwo = '#62B0D4' }) => {

    const [isFirstState, setIsFirstState] = useState(true);

    const handleClick = () => {
        if (isFirstState) {
            onClickOne?.();
        } else {
            onClickTwo ? onClickTwo() : onClickOne?.();
        }
        setIsFirstState(!isFirstState);
    };

    useEffect(() => {
        if (setOne) {
            setIsFirstState(true);
        }
    }, [setOne]);

    return (
        <button
            className="btn-border"
            onClick={handleClick}
            style={{
                color: isFirstState ? colorOne : colorTwo,
                transition: 'background 0.3s ease-in-out',
            }}
        >
            <GradientText colors={[isFirstState ? colorOne : colorTwo]}>
                {isFirstState ? labelOne : labelTwo}
            </GradientText>
        </button>
    );
};

export default ToggleActionButton;
