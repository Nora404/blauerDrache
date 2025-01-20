import React from 'react';
import { GradientText } from '../../utility/GradientText';
import MultiColoredLetters from '../../utility/MultiColoredLetters';
import { blueColors } from '../../data/helper/colorMappingData';


type TwoActionButtonProps = {
    onLeftAction?: () => void;
    leftBtn: string;
    leftDisable?: boolean;
    onRightAction?: () => void;
    rightBtn: string;
    rightDisable?: boolean;
};

const TwoActionButton: React.FC<TwoActionButtonProps> = ({
    onLeftAction, leftBtn, leftDisable,
    onRightAction, rightBtn, rightDisable
}) => {

    const handleLeft = () => {
        onLeftAction?.();
    }
    const handleRight = () => {
        onRightAction?.();
    }

    return (
        <div className='flex-row max-width no-select'>
            <button className="btn-border" onClick={handleLeft} style={{ width: "50%", margin: '10px' }}>
                {leftDisable
                    ? <GradientText colors={['#999999']}>{leftBtn}</GradientText>
                    : <MultiColoredLetters colors={blueColors}>{leftBtn}</MultiColoredLetters>}
            </button>
            <button className="btn-border" onClick={handleRight} style={{ width: "50%", margin: '10px' }}>
                {rightDisable
                    ? <GradientText colors={['#999999']}>{rightBtn}</GradientText>
                    : <MultiColoredLetters colors={blueColors}>{rightBtn}</MultiColoredLetters>}
            </button>
        </div>
    );
};

export default TwoActionButton;