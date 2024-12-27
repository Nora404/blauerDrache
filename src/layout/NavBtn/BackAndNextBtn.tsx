import React from 'react';
import { SYSTEM } from '../../data/colorfullStrings';

type BackAndNextBtnProps = {
    onBack: () => void;
    onNext: () => void;
};

const BackAndNextbtn: React.FC<BackAndNextBtnProps> = ({ onBack, onNext }) => {

    const handleBack = () => {
        onBack?.();
    }

    const handleNext = () => {
        onNext?.();
    }

    return (
        <div className='flex-row max-width'>
            <div onClick={handleBack} style={{ width: "50%" }}>
                {SYSTEM.zurück}
            </div>
            <div onClick={handleNext} style={{ width: "50%" }}>
                {SYSTEM.weiter}
            </div>
        </div>
    );
};

export default BackAndNextbtn;