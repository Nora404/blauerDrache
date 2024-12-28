import React from "react";
import { SYSTEM } from "../../../data/colorfullStrings";
import { RaceName, races, racesMap } from "../../../data/raceDefaults";
import PlayerTalk from "../../../utility/PlayerTalk";
import { WizardData } from "./CreatePlayer";
import Header from "../../../layout/Header/Header";


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
        <div className="max-width">
            <Header>Beantworte die Frage der Wächter Wesen</Header><br />

            {races.map((races) => (
                <div className='mb-1 w-full' key={races.name}>
                    <button className={`text-left w-full ${races.name === selectedRace.name ? 'glow' : ''}`}
                        onClick={() => handleRase(races.name as RaceName)}>
                        {races.label}<br />
                        {races.description}<br />
                        <span style={{ color: '#4BC7AA' }}> {races.bonus} </span>
                    </button>
                </div>
            ))}
            <br />

            <div>
                Du schaust selbstsicher zu den beiden Wesen und sagst: <PlayerTalk>"Ich bin geboren als {selectedRace.label}"</PlayerTalk><br />
            </div><br />

            <div onClick={onNext}>
                {SYSTEM.weiter}
            </div>

        </div>
    );
};

export default ChooseRace;
