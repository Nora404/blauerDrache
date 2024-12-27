import React from "react";
import { CREATURE, SYSTEM } from "../../../data/colorfullStrings";
import { RaceName, races, racesMap } from "../../../data/raceDefaults";
import PlayerTalk from "../../../utility/PlayerTalk";
import { WizardData } from "./CreatePlayer";
import CreatureTalk from "../../../utility/CreaturTalk";
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
            <div className='text-left'>
                <p className='mb-1'>
                    Ein kleines {CREATURE.blauesWesen} fliegt direkt auf dich zu.
                    Es hält nur wenige Zentimeter vor deinem Kopf an und betrachtet dich kritisch.
                </p>

                <p className='mb-1'>
                    <PlayerTalk>"Wa-wa-wa..."</PlayerTalk> stammelst du.<br />
                </p>

                <p className='mb-1'>
                    <CreatureTalk name="rotesWesen">"Du beherschst anscheinend nicht unsere Sprache. Dann werde ich l a n g s a m reden!"</CreatureTalk><br />
                    hörst du eine Stimme hinter dir. Erschrochen drehst du dich um und erkennst ein {CREATURE.rotesWesen}.
                    Es setzt sich auf deine Schulter wärend {CREATURE.blauesWesen} zu sprechen beginnt.
                </p>

                <p className='mb-1'>
                    <CreatureTalk name="blauesWesen">"Also, wir sind hier, um dich mit diesem Reich vertraut zu machen, also tust du gut daran, uns ganz genau zuzuhören"</CreatureTalk>
                </p>

                <p className='mb-1'>
                    Du nickst stumm und schenkst diesen seltsamen Wesen deine volle Aufmerksamkeit.
                </p>

                <p className='mb-1'>
                    <CreatureTalk name="rotesWesen">"Gut, dann fangen wir mal an. Zuerst musst du dich hier anmelden.
                        Dafür brauchen wir deinen Namen, deine Herkunft und so weiter."</CreatureTalk> beginnt das {CREATURE.rotesWesen} seinen Text herunter zu rattern.
                    Zeitgleich holt das {CREATURE.blauesWesen} einen Notizblock und zaubert eine Füllfeder aus dem Nichts heraus.
                    Es macht sich bereit zu schreiben ...
                </p>
            </div><br />

            <Header>Beantworte die Frage der Wächter Wesen</Header><br />

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
