import React from "react";
import { WizardData } from "./CreatePlayer";
import { emptyRaceObj } from "../../../data/raceData";
import BackAndNextbtn from "../../../layout/NavBtn/BackAndNextBtn";
import PlayerTalk from "../../../utility/PlayerTalk";
import Header from "../../../layout/Header/Header";
import { callingMap, CallingName, callings } from "../../../data/callingData";

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

    const handleCalling = (equipName: CallingName) => {
        setWizardData(prev => ({
            ...prev,
            calling: equipName,
        }));
    };

    const selectedCalling = callingMap[wizardData.calling] || emptyRaceObj;

    return (
        <div className="max-width">
            <Header>Beantworte die Frage der Wächter Wesen</Header><br />

            {callings.map((callings) => (
                <div className='mb-1 w-full' key={callings.name}>
                    <button className={`text-left w-full ${callings.name === selectedCalling.name ? 'glow' : ''}`}
                        onClick={() => handleCalling(callings.name as CallingName)}>
                        {callings.label}<br />
                        {callings.description}<br />
                        <span style={{ color: '#4BC7AA' }}> {callings.bonus} </span>
                    </button>
                </div>
            ))}
            <br />

            <div><br />
                Du schaust selbstsicher zu den beiden Wesen und sagst: <PlayerTalk>"Ich bin gekommen um {selectedCalling.label} zu werden"</PlayerTalk><br />
            </div><br />

            <BackAndNextbtn onBack={onBack} onNext={onNext} />
        </div>
    );
};

export default ChooseEquipment;
