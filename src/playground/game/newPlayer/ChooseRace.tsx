import React from "react";
import { SYSTEM } from "../../../data/colorfullStrings";
import { RaceName, races, racesMap } from "../../../data/raceDefaults";
import PlayerTalk from "../../../utility/PlayerTalk";
import { WizardData } from "./CreatePlayer";


interface ChooseRaceProps {
    wizardData: WizardData;
    setWizardData: React.Dispatch<React.SetStateAction<WizardData>>;
    onNext: () => void;
}

const ChooseRace: React.FC<ChooseRaceProps> = ({ wizardData, setWizardData, onNext }) => {

    const handleRase = (raceName: RaceName) => {
        setWizardData(prev => ({
            ...prev,
            race: raceName,
        }));
    };

    const selectedRace = racesMap[wizardData.race];

    return (
        <div>
            <div className='text-left'>
                {races.map((races) => (
                    <div className='mb-1' key={races.name}>
                        <button onClick={() => handleRase(races.name as RaceName)}>
                            {races.label}
                        </button><br />
                        {races.description}
                        <span style={{ color: '#4BC7AA' }}> {races.bonus} </span>
                    </div>
                ))}
            </div><br />

            <div>
                Du schaust selbstsicher zu den beiden Wesen und sagst: <PlayerTalk>"Ich bin geboren als {selectedRace.label}"</PlayerTalk><br />
            </div><br />

            <div>
                <button disabled={!wizardData.race} onClick={onNext}>
                    {SYSTEM.weiter}
                </button>
            </div>

        </div>
    );
};

export default ChooseRace;
