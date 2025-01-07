//region [imports]
import React from 'react';
import PlayerTalk from '../../../utility/PlayerTalk';
import { RaceName } from '../../../data/raceData';
import Header from '../../../layout/Header/Header';
import BackAndNextbtn from '../../../layout/ActionButtons/BackAndNextBtn';
import { WizardData } from './CreatePlayer';
import { getOriginByRaces, originMap, OriginName } from '../../../data/originData';
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

    const origins = getOriginByRaces(wizardData.race.name as RaceName);
    //#endregion

    //#region [handler]
    const handleOrigin = (originName: OriginName) => {
        setWizardData(prev => ({
            ...prev,
            origin: originMap[originName],
        }));
    };
    //#endregion

    //#region [jsx]
    return (
        <div className="max-width">
            <Header>Beantworte die Frage der Wächter Wesen</Header><br />

            {origins.map((origin) => (
                <div className='mb-1 w-full' key={origin.name}>
                    <button className={`text-left w-full ${origin.name === wizardData.origin.name ? 'glow' : ''}`}
                        onClick={() => handleOrigin(origin.name as OriginName)}>
                        {origin.label}<br />
                        {origin.description}<br />
                        <span style={{ color: '#4BC7AA' }}> {origin.bonus} </span>
                    </button>
                </div>
            ))}
            <br />

            <div><br />
                Du schaust selbstsicher zu den beiden Wesen und sagst: <PlayerTalk>"Ich bin ein {wizardData.origin.label}"</PlayerTalk><br />
            </div><br />

            <BackAndNextbtn onOneAction={onBack} onSecAction={onNext} />

        </div>
    );
    //#endregion
};

export default ChooseOrigin;