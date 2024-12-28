import React from 'react';
import { SYSTEM } from '../../data/colorfullStrings';

type BackAndNextBtnProps = {
    onBack: () => void;
    onNext: () => void;
    backBtn?: "zurück" | "abbrechen";
    nextBtn?: "weiter" | "fertig";
};

const BackAndNextbtn: React.FC<BackAndNextBtnProps> = ({ onBack, onNext, backBtn = "zurück", nextBtn = "weiter" }) => {

    const handleBack = () => {
        onBack?.();
    }

    const handleNext = () => {
        onNext?.();
    }

    return (
        <div className='flex-row max-width'>
            <div onClick={handleBack} style={{ width: "50%" }}>
                {backBtn === "zurück" ? SYSTEM.zurück : SYSTEM.abbrechen}
            </div>
            <div onClick={handleNext} style={{ width: "50%" }}>
                {nextBtn === "weiter" ? SYSTEM.weiter : SYSTEM.fertig}
            </div>
        </div>
    );
};

export default BackAndNextbtn;