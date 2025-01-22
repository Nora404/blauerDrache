import React from 'react';
import MultiColoredLetters from '../../utility/Formatted/MultiColoredLetters';
import { blueColors } from '../../data/helper/colorMappingData';
import { GradientText } from '../../utility/Formatted/GradientText';

type ActionButtonProps = {
    onClick?: () => void;
    label: string;
    disable?: boolean;
};

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, label, disable }) => {

    const handleClick = () => {
        onClick?.();
    }

    return (
        <button className="btn-border" onClick={handleClick}>
            {disable
                ? <GradientText colors={['#999999']}>{label}</GradientText>
                : <MultiColoredLetters colors={blueColors}>{label}</MultiColoredLetters>}
        </button>
    );
};

export default ActionButton;
