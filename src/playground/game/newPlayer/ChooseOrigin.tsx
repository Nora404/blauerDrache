//region [imports]
import React from 'react';
import PlayerTalk from '../../../utility/PlayerTalk';
import { emptyRaceObj, emptySubraceObj, OriginName, racesMap } from '../../../data/raceData';
import Header from '../../../layout/Header/Header';
import BackAndNextbtn from '../../../layout/NavBtn/BackAndNextBtn';
import { WizardData } from './CreatePlayer';
//#endregion

//#region [prepare]
type ChooseOriginProps = {
    wizardData: WizardData;
    setWizardData: React.Dispatch<React.SetStateAction<WizardData>>;
    onBack: () => void;
    onNext: () => void;
};

const ChooseOrigin: React.FC<ChooseOriginProps> = ({
    wizardData,
    setWizardData,
    onBack,
    onNext,
}) => {

    const selectedRace = racesMap[wizardData.race] || emptyRaceObj;
    const selectedSubrace = selectedRace.subraces.find(
        (subrace) => subrace.name === wizardData.origin
    ) || emptySubraceObj;
    //#endregion

    //#region [handler]
    const handleOrigin = (originName: OriginName) => {
        setWizardData(prev => ({
            ...prev,
            origin: originName,
        }));
    };
    //#endregion

    //#region [jsx]
    return (
        <div className="max-width">
            <Header>Beantworte die Frage der Wächter Wesen</Header><br />

            {selectedRace.subraces.map((subrace) => (
                <div className='mb-1 w-full' key={subrace.name}>
                    <button className={`text-left w-full ${subrace.name === selectedSubrace.name ? 'glow' : ''}`}
                        onClick={() => handleOrigin(subrace.name as OriginName)}>
                        {subrace.label}<br />
                        {subrace.description}<br />
                        <span style={{ color: '#4BC7AA' }}> {subrace.bonus} </span>
                    </button>
                </div>
            ))}
            <br />

            <div><br />
                Du schaust selbstsicher zu den beiden Wesen und sagst: <PlayerTalk>"Ich bin ein {selectedSubrace?.label}"</PlayerTalk><br />
            </div><br />

            <BackAndNextbtn onBack={onBack} onNext={onNext} />

        </div>
    );
    //#endregion
};

export default ChooseOrigin;