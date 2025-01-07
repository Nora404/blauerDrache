import React from 'react';
import MultiColoredLetters from '../../utility/MultiColoredLetters';
import { blueColors } from '../../data/colorMappingData';

type ActionButtonProps = {
    children: string;
    onClick: () => void;
};

const ActionButton: React.FC<ActionButtonProps> = ({ children, onClick }) => {
    return (
        <button className="btn-border" onClick={onClick}>
            <MultiColoredLetters colors={blueColors}>{children}</MultiColoredLetters>
        </button>
    );
};

export default ActionButton;
