import React, { } from "react";
import { WizardData } from "./CreatePlayer";

interface ChooseNameProps {
    wizardData: WizardData;
    setWizardData: React.Dispatch<React.SetStateAction<WizardData>>;
    onBack: () => void;
    onFinalize: () => void;
}

const ChooseName: React.FC<ChooseNameProps> = ({
    wizardData,
    setWizardData,
    onBack,
    onFinalize,
}) => {

    const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setWizardData(prev => ({
            ...prev,
            name: evt.target.value,
        }));
    };

    return (
        <div>
            <h2>Gib deinem Helden einen Namen!</h2>
            <input
                type="text"
                value={wizardData.name}
                onChange={handleNameChange}
                placeholder="z.B. Nora404"
            />

            <div>
                <button onClick={onBack}>Zurück</button>
                <button disabled={!wizardData.name} onClick={onFinalize}>
                    Fertigstellen
                </button>
            </div>
        </div>
    );
};

export default ChooseName;
