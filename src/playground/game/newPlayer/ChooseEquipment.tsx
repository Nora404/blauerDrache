import React from "react";
import { WizardData } from "./CreatePlayer";
import { EquipmentName } from "../../../data/raceDefaults";

interface ChooseEquipmentProps {
    wizardData: WizardData;
    setWizardData: React.Dispatch<React.SetStateAction<WizardData>>;
    onBack: () => void;
    onNext: () => void;
}

const ChooseEquipment: React.FC<ChooseEquipmentProps> = ({
    wizardData,
    setWizardData,
    onBack,
    onNext,
}) => {

    const handleEquipment = (equipName: EquipmentName) => {
        setWizardData(prev => ({
            ...prev,
            calling: equipName,
        }));
    };

    return (
        <div>
            <h2>Ausrüstung wählen</h2>
            <button onClick={() => handleEquipment("Bauer")}>Holzschwert</button>
            <button onClick={() => handleEquipment("Söldner")}>Lederrüstung</button>
            {/* ... usw. ... */}

            <div>
                <button onClick={onBack}>Zurück</button>
                <button disabled={!wizardData.calling} onClick={onNext}>
                    Weiter
                </button>
            </div>
        </div>
    );
};

export default ChooseEquipment;
