import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { defaultPlayerData, useGameStore } from '../../../data/gameStore';
import { equipmentDefaults, EquipmentName, originDefaults, OriginName, raceDefaults, RaceName } from '../../../data/raceDefaults';
import { CREATURE } from '../../../data/colorfullStrings';
import PlayerTalk from '../../../utility/PlayerTalk';
import CreatureTalk from '../../../utility/CreaturTalk';
import Header from '../../../layout/Header/Header';
import { DryadAscii, DwarfAscii, ElfAscii, FelkinAscii, FenrilAscii, HumanAscii, LizardAscii, TrollAscii } from '../../../data/playerAscii';
import ChooseRace from './ChooseRace';
import ChooseOrigin from './ChooseOrigin';
import ChooseEquipment from './ChooseEquipment';
import ChooseName from './ChooseName';
import PlayerPreview from './PlayerPreview';

export type WizardData = {
    race: RaceName;
    origin: OriginName;
    equipment: EquipmentName;
    name: string;
}


type CreatePlayerProps = {

};

const CreatePlayer: React.FC<CreatePlayerProps> = () => {
    const { updateStats, updateMeta, updateEconomy } = useGameStore();

    const [currentStep, setCurrentStep] = useState<number>(0);
    const [wizardData, setWizardData] = useState<WizardData>({
        race: "Mensch",
        origin: "Stadtmensch",
        equipment: "Bauer",
        name: "Nora404",
    });

    const goNext = () => setCurrentStep((prev) => prev + 1);
    const goBack = () => setCurrentStep((prev) => prev - 1);


    useEffect(() => {
        console.log(currentStep);
    }, [currentStep]);

    const handleFinalize = () => {

        const raceBase = raceDefaults[wizardData.race] ?? {};
        const originBase = originDefaults[wizardData.origin] ?? {};
        const equipmentBase = equipmentDefaults[wizardData.equipment] ?? {};

        // Kombiniere Stats/Economy
        const combinedStats = {
            ...defaultPlayerData.stats,
            ...raceBase.stats,
            ...originBase.stats,
            ...equipmentBase.stats,
        };
        const combinedEconomy = {
            ...defaultPlayerData.economy,
            ...raceBase.economy,
            ...originBase.economy,
            ...equipmentBase.economy,
        };

        updateStats(combinedStats);
        updateEconomy(combinedEconomy);

        updateMeta({
            name: wizardData.name,
            rase: wizardData.race,
            origin: wizardData.origin,
            creating: true,
        });

        navigate("/somewhere");
    };
    const navigate = useNavigate();

    return (
        <div className="max-width">
            <h2>Als was werden dich die Bewohner dieser Welt erkennen?</h2>

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

            <div className='flex-row max-width padding-x'>
                <HumanAscii />
                <ElfAscii />
                <DwarfAscii />
                <LizardAscii />
                <TrollAscii />
                <FelkinAscii />
                <FenrilAscii />
                <DryadAscii />
            </div><br />

            <Header>Beantworte die Frage der Wächter Wesen</Header>

            <br />

            <div>
                <PlayerPreview wizardData={wizardData} />
            </div>
            <br />

            {currentStep === 0 && (
                <ChooseRace
                    wizardData={wizardData}
                    setWizardData={setWizardData}
                    onNext={goNext}
                />
            )}
            {currentStep === 1 && (
                <ChooseOrigin
                    wizardData={wizardData}
                    setWizardData={setWizardData}
                    onBack={goBack}
                    onNext={goNext}
                />
            )}
            {currentStep === 2 && (
                <ChooseEquipment
                    wizardData={wizardData}
                    setWizardData={setWizardData}
                    onBack={goBack}
                    onNext={goNext}
                />
            )}
            {currentStep === 3 && (
                <ChooseName
                    wizardData={wizardData}
                    setWizardData={setWizardData}
                    onBack={goBack}
                    // statt onNext=goNext machen wir hier schon Finalize
                    onFinalize={handleFinalize}
                />
            )}
        </div>
    );
};

export default CreatePlayer;
