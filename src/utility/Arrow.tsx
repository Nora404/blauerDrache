import React from 'react';
import {
    MoveDown,
    MoveDownLeft,
    MoveDownRight,
    MoveLeft,
    MoveRight,
    MoveUp,
    MoveUpLeft,
    MoveUpRight,
    Circle,
    LucideProps,
} from 'lucide-react';

type ArrowType = 'n' | 'o' | 's' | 'w' | 'no' | 'so' | 'nw' | 'sw';

type ArrowProps = {
    type?: ArrowType;
};

const arrowMapping: Record<ArrowType, { icon: React.ComponentType<LucideProps>; color: string }> = {
    n: { icon: MoveUp, color: '#6E73FF' },          //blau
    o: { icon: MoveRight, color: '#AB6AFF' },        //violett
    s: { icon: MoveDown, color: '#FFEF6C' },         //gelb
    w: { icon: MoveLeft, color: '#F46DFF' },           //pink
    no: { icon: MoveUpRight, color: '#B4FF7C' },      //grün
    so: { icon: MoveDownRight, color: '#FF7274' },      // rot
    nw: { icon: MoveUpLeft, color: '#7CFFC2' },   //türkis
    sw: { icon: MoveDownLeft, color: '#FFC066' },    //orange
};

const Arrow: React.FC<ArrowProps> = ({ type }) => {
    if (type && arrowMapping[type]) {
        const { icon: IconComponent, color } = arrowMapping[type];
        return (
            <span className="arrow">
                <IconComponent size={24} color={color} />
            </span>
        );
    }
    return (
        <span className="arrow">
            <Circle size={24} color="currentColor" />
        </span>
    );
};

export default Arrow;
