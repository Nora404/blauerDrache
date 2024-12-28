import React from 'react';
import PlayerTalk from '../../../utility/PlayerTalk';
import { emptyRaceObj, emptySubraceObj, OriginName, racesMap } from '../../../data/raceDefaults';
import Header from '../../../layout/Header/Header';
import BackAndNextbtn from '../../../layout/NavBtn/BackAndNextBtn';
import { WizardData } from './CreatePlayer';

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

    const handleOrigin = (originName: OriginName) => {
        setWizardData(prev => ({
            ...prev,
            origin: originName,
        }));
    };

    const selectedRace = racesMap[wizardData.race] || emptyRaceObj;
    const selectedSubrace = selectedRace.subraces.find(
        (subrace) => subrace.name === wizardData.origin
    ) || emptySubraceObj;


    return (
        <div className="max-width">
            <Header>Beantworte die Frage der Wächter Wesen</Header><br />

            {selectedRace.subraces.map((subrace) => (
                <div className='mb-1 w-full' key={subrace.name}>
                    <button className="text-left w-full" onClick={() => handleOrigin(subrace.name as OriginName)}>
                        {subrace.label}<br />
                        {subrace.description}
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
};

export default ChooseOrigin;