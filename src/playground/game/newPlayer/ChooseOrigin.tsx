import React from 'react';
import { CREATURE } from '../../../data/colorfullStrings';
import CreatureTalk from '../../../utility/CreaturTalk';
import PlayerTalk from '../../../utility/PlayerTalk';
import { OriginName, racesMap } from '../../../data/raceDefaults';
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

    const selectedRace = racesMap[wizardData.race];

    const selectedSubrace = selectedRace.subraces.find(
        (subrace) => subrace.name === wizardData.origin
    );


    return (
        <div className="max-width">
            <div className='text-left'>

                <p className='mb-1'>
                    <CreatureTalk name="rotesWesen">"Glaubst du wir sind blind, das wir das nicht selbst schon erkannt haben?" </CreatureTalk>
                    Höhnt das {CREATURE.roteWesen} während es langsam um dich herum schwebt. Das {CREATURE.blaueWesen} flattert zu dir und schupst das {CREATURE.roteWesen} weg.
                </p>
                <p className='mb-1'>
                    <CreatureTalk name="blauesWesen">"Er will nur wissen woher du kommst, zu welcher Gruppe du gehörst."</CreatureTalk>
                </p>
            </div><br />

            <Header>Beantworte die Frage der Wächter Wesen</Header>

            <br />

            {selectedRace.subraces.map((subrace) => (
                <div className='mb-1 text-left' key={subrace.name}>
                    <button onClick={() => handleOrigin(subrace.name as OriginName)}>
                        {subrace.label}
                    </button><br />
                    {subrace.description}
                    <span style={{ color: '#4BC7AA' }}> {subrace.bonus} </span>
                </div>
            ))}

            <div>
                Du schaust selbstsicher zu den beiden Wesen und sagst: <PlayerTalk>"Ich bin ein {selectedSubrace?.label}"</PlayerTalk><br />
            </div><br />

            <BackAndNextbtn onBack={onBack} onNext={onNext} />

        </div>
    );
};

export default ChooseOrigin;