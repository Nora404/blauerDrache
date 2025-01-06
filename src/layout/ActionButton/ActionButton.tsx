import React from 'react';
import MultiColoredLetters from '../../utility/MultiColoredLetters';
import { blueColors } from '../../data/colorMappingData';

type ActionButtonProps = {
    children: string;
};

const ActionButton: React.FC<ActionButtonProps> = ({ children }) => {
    return (
        <button className="btn-border">
            <MultiColoredLetters colors={blueColors}>{children}</MultiColoredLetters>
        </button>
    );
};

export default ActionButton;
