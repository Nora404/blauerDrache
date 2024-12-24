import React, { ReactNode } from 'react';

type ColoredLetterProps = {
    children: string;
    color?: string;
    index?: number;
};

const ColoredLetter: React.FC<ColoredLetterProps> = ({ children, color = '#8DCCE9', index }) => {
    const text = typeof children === 'string' ? children : '';

    const targetIndex = (index !== undefined && index >= 0 && index < text.length) ? index : 0;

    const before = text.slice(0, targetIndex);
    const targetChar = text.charAt(targetIndex);
    const after = text.slice(targetIndex + 1);

    return (
        <span>
            {before}
            <span style={{ color: color, fontSize: '100%' }}>{targetChar}</span>
            {after}
        </span>
    );
};

export default ColoredLetter;
