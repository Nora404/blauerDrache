import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { defaultPlayerData, useGameStore } from '../../../data/gameStore';
import { callingDefaults, EquipmentName, originDefaults, OriginName, raceDefaults, RaceName } from '../../../data/raceDefaults';
import { DryadAscii, DwarfAscii, ElfAscii, FelkinAscii, FenrilAscii, HumanAscii, LizardAscii, TrollAscii } from '../../../data/playerAscii';
import ChooseRace from './ChooseRace';
import ChooseOrigin from './ChooseOrigin';
import ChooseEquipment from './ChooseEquipment';
import ChooseName from './ChooseName';
import PlayerPreview from './PlayerPreview';

export type WizardData = {
    race: RaceName;
    origin: OriginName;
    calling: EquipmentName;
    name: string;
}

type MergeableObject = {
    [key: string]: number;
};

type CreatePlayerProps = {

};

const CreatePlayer: React.FC<CreatePlayerProps> = () => {
    const { updateStats, updateMeta, updateEconomy } = useGameStore();

    const [currentStep, setCurrentStep] = useState<number>(0);
    const [wizardData, setWizardData] = useState<WizardData>({
        race: "Mensch",
        origin: "Stadtmensch",
        calling: "Bauer",
        name: "Unbekant",
    });

    const goNext = () => setCurrentStep((prev) => prev + 1);
    const goBack = () => setCurrentStep((prev) => prev - 1);

    const handleFinalize = () => {
        const raceBase = raceDefaults[wizardData.race] ?? {};
        const originBase = originDefaults[wizardData.origin] ?? {};
        const callingBase = callingDefaults[wizardData.calling] ?? {};

        const sumProperties = (base: MergeableObject, ...others: MergeableObject[]) => {
            return others.reduce((acc, obj) => {
                for (let key in obj) {
                    if (typeof obj[key] === 'number') {
                        acc[key] = (acc[key] || 0) + obj[key];
                    }
                }
                return acc;
            }, { ...base });
        };

        const combinedStats = sumProperties(
            defaultPlayerData.stats,
            raceBase.stats || {},
            originBase.stats || {},
            callingBase.stats || {}
        );

        const combinedEconomy = sumProperties(
            defaultPlayerData.economy,
            raceBase.economy || {},
            originBase.economy || {},
            callingBase.economy || {}
        );

        updateStats(combinedStats);
        updateEconomy(combinedEconomy);

        updateMeta({
            name: wizardData.name,
            rase: wizardData.race,
            origin: wizardData.origin,
            calling: wizardData.calling,
            creating: true,
        });

        navigate("/somewhere");
    };

    useEffect(() => {
        updateMeta({
            creating: false,
        })
    }, []);

    const navigate = useNavigate();

    return (
        <div className="max-width">
            <h2>Als was werden dich die Bewohner dieser Welt erkennen?</h2>

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


            {currentStep > 0 && (
                <><br />
                    <div>
                        <PlayerPreview wizardData={wizardData} />
                    </div></>)}
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
