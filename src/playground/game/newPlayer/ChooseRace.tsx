//#region [imports]
import React from "react";
import { RaceName, races, racesMap } from "../../../data/raceData";
import PlayerTalk from "../../../utility/PlayerTalk";
import { WizardData } from "./CreatePlayer";
import Header from "../../../layout/Header/Header";
import ActionButton from "../../../layout/ActionButtons/ActionButton";
//#endregion

//#region [prepare]
type ChooseRaceProps = {
    wizardData: WizardData;
    setWizardData: React.Dispatch<React.SetStateAction<WizardData>>;
    onNext: () => void;
}

const ChooseRace: React.FC<ChooseRaceProps> = ({ wizardData, setWizardData, onNext }) => {
    //#endregion

    //#region [handler]
    const handleRase = (raceName: RaceName) => {
        setWizardData(prev => ({
            ...prev,
            race: racesMap[raceName],
        }));
    };
    //#endregion

    //#region [jsx]
    return (
        <div className="max-width">
            <Header>Beantworte die Frage der Wächter Wesen</Header><br />

            {races.map((races) => (
                <div className='mb-1 w-full' key={races.name}>
                    <button className={`text-left w-full ${races.name === wizardData.race.name ? 'glow' : ''}`}
                        onClick={() => handleRase(races.name as RaceName)}>
                        {races.label}<br />
                        {races.description}<br />
                        <span style={{ color: '#4BC7AA' }}> {races.bonus} </span>
                    </button>
                </div>
            ))}
            <br />

            <div>
                Du schaust selbstsicher zu den beiden Wesen und sagst: <PlayerTalk>"Ich bin geboren als {wizardData.race.label}"</PlayerTalk><br />
            </div><br />

            <ActionButton onClick={onNext} label="weiter" />

        </div>
    );
    //#endregion
};

export default ChooseRace;
