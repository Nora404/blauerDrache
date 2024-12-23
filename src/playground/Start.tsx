import React, { useEffect, useState } from 'react';
import { GradientText } from '../utility/GradientText';
import RandomSentence from '../utility/RandomSentence';
import { BATTLELIST, ENEMIELIST, NAMELIST, PLACELIST, VERBLIST, WEAPONSLIST } from '../data/randomSentenceData';
import Header from '../layout/Header/Header';
import { CREATURE } from '../data/colorfullStrings';
import CreatureTalk from '../utility/CreaturTalk';
import drache from '../assets/drache-01.png';

type StartProps = {
    title?: string;
    onClick?: () => void;
};

const Start: React.FC<StartProps> = () => {
    const [gameTime, setGameTime] = useState<string>("12:00")

    useEffect(() => {
        const updateGameTime = () => {
            const now = new Date();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            // Gesamtsekunden seit Beginn der Stunde
            const totalSeconds = minutes * 60 + seconds;

            // Berechnung der neuen Stundenanzahl in gameTime
            const gameHours = (totalSeconds / 3600) * 24; // 24 Stunden entsprechen 60 realen Minuten

            const calculatedHours = Math.floor(gameHours) % 24;
            let calculatedMinutes = Math.floor((gameHours - Math.floor(gameHours)) * 60);

            // Runden der Minuten auf das nächste 10er-Multiplikum
            calculatedMinutes = Math.floor(calculatedMinutes / 10) * 10;

            // Formatierung mit führenden Nullen
            const formattedHours = String(calculatedHours).padStart(2, '0');
            const formattedMinutes = String(calculatedMinutes).padStart(2, '0');

            // Erstellung des neuen Zeitstrings
            const newGameTime = `${formattedHours}:${formattedMinutes}`;

            // Aktualisierung des States, nur wenn sich die Zeit ändert
            if (newGameTime !== gameTime) {
                setGameTime(newGameTime);
            }
        };
        updateGameTime();
        const intervalId = setInterval(updateGameTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='max-width'>
            <div>
                Willkommen bei <b>Legende des blauen Drachen</b>, <br />
                ein browser-basiertes Rollenspiel, inspiriert von der &nbsp;
                <a href="https://lotgd.de/home.php?" target='blank'><GradientText colors={["#0066ff", "#00ff00"]}>Legende des grünen Drachen</GradientText></a><br />
                Das Spiel ist absolut werbe- und kostenfrei!<br className='mb-1' />

                Die aktuelle Uhrzeit in Lahtheim ist <b>{gameTime} Uhr</b><br />
                Es ist ...<br />
                Das Wetter heute ist ... <br className='mb-1' />
            </div>

            <img src={drache} width={"30%"} />

            <div>
                <p className='text-left'>
                    Du stehst vor den Toren von Lahtheim, es ist ein warmer heller Tag. Bevor du auch nur einen Schritt gehen kannst,
                    kommt ein kleines <GradientText colors={['#CF388F', '#8839CF']}>geflügeltes Wesen</GradientText> zu dir. Mit großen Augen schaut es erwartungsvoll zu dir hoch.
                    Im nächsten Moment fängt es mit schriller Stimme an zu reden:<br className='mb-1' />

                    <CreatureTalk name="geflügeltesWesen">
                        „Willkommen in Lahtheim! Bist du hier, um vor den Bezwingern des {CREATURE.grünerDrache} zu fliehen?
                        In unserem Dorf ist Platz für dich. Sei nett, dann darfst du vielleicht einmal den {CREATURE.blauerDrache} besuchen.“
                    </CreatureTalk><br className='mb-1' />

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

export default Start;
