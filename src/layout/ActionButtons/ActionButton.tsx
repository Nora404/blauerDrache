import React from 'react';
import MultiColoredLetters from '../../utility/Formatted/MultiColoredLetters';
import { blueColors } from '../../data/helper/colorMappingData';
import { GradientText } from '../../utility/Formatted/GradientText';
import { parseDescription } from '../../utility/Helper/ParseTextToJSX';

type ActionButtonProps = {
    onClick?: () => void;
    label: string;
    disable?: boolean;
    result?: string;
};

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, label, disable, result }) => {

    const handleClick = () => {
        onClick?.();
    }

    return (
        <button className="btn-border" onClick={handleClick}>
            {disable
                ? <GradientText colors={['#999999']}>{label}</GradientText>
                : <MultiColoredLetters colors={blueColors}>{label}</MultiColoredLetters>}
            {result && <span className='text-blue-dark font-small'>{' '}{parseDescription(result)}</span>}
        </button>
    );
};

export default ActionButton;
