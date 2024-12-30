import React, { } from 'react';
import { GradientText } from '../../../../utility/GradientText';
import RandomSentence from '../../../../utility/RandomSentence';
import { BATTLELIST, ENEMIELIST, NAMELIST, PLACELIST, VERBLIST, WEAPONSLIST } from '../../../../data/randomSentenceData';
import Header from '../../../../layout/Header/Header';
import { CREATURE } from '../../../../data/colorfullStrings';
import CreatureTalk from '../../../../utility/CreaturTalk';
import drache from '../../../../assets/drache-01.png';
import { useGameState } from '../../../../data/gameState';
import { useGameStore } from '../../../../data/gameStore';

type NorthGateProps = {
    title?: string;
    onClick?: () => void;
};

const NorthGate: React.FC<NorthGateProps> = () => {
    const { gameStore: gameData } = useGameStore();
    const gameState = useGameState();
    if (!gameState) return null;

    const { gameTime, gameDay } = gameState;

    return (
        <div className='max-width'>
            <p className='mb-1'>
                Willkommen bei <b>Legende des blauen Drachen</b>, <br />
                ein browser-basiertes Rollenspiel, inspiriert von der &nbsp;
                <a href="https://lotgd.de/home.php?" target='blank'><GradientText colors={["#0066ff", "#00ff00"]}>Legende des grünen Drachen</GradientText></a><br />
            </p>

            <p className='mb-1'>
                Die aktuelle Uhrzeit in Lahtheim ist <b>{gameTime} Uhr.</b> Es ist <b>{gameDay}</b>.
                Das Wetter heute ist {gameData.meta.weather} und {gameData.meta.temperature}.
            </p>

            <img src={drache} width={"30%"} />

            <div className='text-left'>
                <p className='mb-1'>
                    Du stehst vor den Toren von Lahtheim Es ist mitlerweile {gameDay}, du spürst die {gameData.meta.temperature}e Luft auf deinem Gesicht.
                    Bevor du auch nur einen Schritt gehen kannst,
                    kommt ein kleines <GradientText colors={['#CF388F', '#8839CF']}>geflügeltes Wesen</GradientText> zu dir.
                    Mit großen Augen schaut es erwartungsvoll zu dir hoch.
                    Im nächsten Moment fängt es mit schriller Stimme an zu reden:
                </p>

                <p className='mb-1'>
                    <CreatureTalk name="geflügeltesWesen">
                        „Willkommen in Lahtheim! Bist du hier, um vor den Bezwingern des {CREATURE.grünerDrache} zu fliehen?
                        In unserem Dorf ist Platz für dich. Sei nett, dann darfst du vielleicht einmal den {CREATURE.blauerDrache} besuchen.“
                    </CreatureTalk>
                </p>

                <p className='mb-1'>
                    Ohne auf deine Antwort zu warten dreht sich das <GradientText colors={['#CF388F', '#8839CF']}>geflügelte Wesen</GradientText> um und flattert durch den Torbogen Richtung Brunnen davon.
                </p>
            </div>

            <div>
                <Header>Erfolgreiche Entdecker</Header>
                <RandomSentence partOne={NAMELIST} partTwo={VERBLIST} partThree={PLACELIST} />
                <RandomSentence partOne={NAMELIST} partTwo={VERBLIST} partThree={PLACELIST} />
                <RandomSentence partOne={NAMELIST} partTwo={VERBLIST} partThree={PLACELIST} />
                <br className='mb-1' />
            </div>

            <div>
                <Header>Mutige Kämpfer</Header>
                <RandomSentence partOne={NAMELIST} partTwo={BATTLELIST} partThree={ENEMIELIST} partFour={WEAPONSLIST} />
                <RandomSentence partOne={NAMELIST} partTwo={BATTLELIST} partThree={ENEMIELIST} partFour={WEAPONSLIST} />
                <RandomSentence partOne={NAMELIST} partTwo={BATTLELIST} partThree={ENEMIELIST} partFour={WEAPONSLIST} />
                <br className='mb-1' />
            </div>
        </div>
    );
};

export default NorthGate;
