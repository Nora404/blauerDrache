//#region [imports]
import React, { } from "react";
import { WizardData } from "./CreatePlayer";
import BackAndNextbtn from "../../../layout/NavBtn/BackAndNextBtn";
import PlayerTalk from "../../../utility/PlayerTalk";
import Header from "../../../layout/Header/Header";
import { callingMap, CallingName, callings } from "../../../data/callingData";
//endregion

//#region [prepare]
type ChooseCallingProps = {
    wizardData: WizardData;
    setWizardData: React.Dispatch<React.SetStateAction<WizardData>>;
    onBack: () => void;
    onNext: () => void;
}

const ChooseCalling: React.FC<ChooseCallingProps> = ({
    wizardData,
    setWizardData,
    onBack,
    onNext,
}) => {
    //#endregion

    //#region [handler]
    const handleCalling = (callingName: CallingName) => {
        setWizardData(prev => ({
            ...prev,
            calling: callingMap[callingName],
        }));
    };
    //#endregion

    //#region [jsx]
    return (
        <div className="max-width">
            <Header>Beantworte die Frage der Wächter Wesen</Header><br />

            {callings.map((callings) => (
                <div className='mb-1 w-full' key={callings.name}>
                    <button className={`text-left w-full ${callings.name === wizardData.calling.name ? 'glow' : ''}`}
                        onClick={() => handleCalling(callings.name as CallingName)}>
                        {callings.label}<br />
                        {callings.description}<br />
                        <span style={{ color: '#4BC7AA' }}> {callings.bonus} </span>
                    </button>
                </div>
            ))}
            <br />

            <div><br />
                Du schaust selbstsicher zu den beiden Wesen und sagst: <PlayerTalk>"Ich bin gekommen um {wizardData.calling.label} zu werden"</PlayerTalk><br />
            </div><br />

            <BackAndNextbtn onBack={onBack} onNext={onNext} />
        </div>
    );
    //#endregion
};

export default ChooseCalling;
