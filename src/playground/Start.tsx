import React from 'react';
import { GradientText } from '../utility/GradientText';
import RandomSentence from '../utility/RandomSentence';
import { battleList, enemieList, nameList, placeList, verbList, weaponsList } from '../data/randomSentenceData';
import Header from '../layout/Header';

type StartProps = {
    title?: string;
    onClick?: () => void;
};

const Start: React.FC<StartProps> = () => {

    return (
        <div className='max-width'>
            <div>
                Willkommen bei <b>Legende des blauen Drachen</b>, <br />
                ein browser-basiertes Rollenspiel, inspiriert von der &nbsp;
                <a href="https://lotgd.de/home.php?" target='blank'><GradientText colors={["#0066ff", "#00ff00"]}>Legende des grünen Drachen</GradientText></a><br />
                Das Spiel ist absolut werbe- und kostenfrei!<br className='mb-1' />

                Die aktuelle Uhrzeit in Lahtheim ist ... <br />
                Es ist ...<br />
                Das Wetter heute ist ... <br className='mb-1' />
            </div>

            <div>
                <p className='text-left'>
                    Du stehst vor den Toren von Lahtheim, es ist ein warmer heller Tag. Bevor du auch nur einen Schritt gehen kannst,
                    kommt ein kleines <GradientText colors={['#CF388F', '#8839CF']}>geflügeltes Wesen</GradientText> zu dir. Mit großen Augen schaut es erwartungsvoll zu dir hoch.
                    Im nächsten Moment fängt es mit schriller Stimme an zu reden:<br className='mb-1' />

                    <span style={{ color: '#7EF5F2' }}>
                        „Willkommen in Lahtheim! Bist du hier, um vor den Bezwingern des <b><GradientText colors={['#46CF25', '#29CF72']}>grünen Drachen</GradientText></b> zu fliehen?
                        In unserem Dorf ist Platz für dich. Sei nett, dann darfst du vielleicht einmal den <b><GradientText colors={['#1ECECF', '#1763CF']}>blauen Drachen</GradientText></b> besuchen.“
                    </span><br className='mb-1' />

                    Ohne auf deine Antwort zu warten dreht sich das <GradientText colors={['#CF388F', '#8839CF']}>geflügelte Wesen</GradientText> um und flattert durch den Torbogen Richtung Brunnen davon.
                </p>
            </div>

            <div>
                <Header>Erfolgreiche Entdecker</Header>
                <RandomSentence partOne={nameList} partTwo={verbList} partThree={placeList} />
                <RandomSentence partOne={nameList} partTwo={verbList} partThree={placeList} />
                <RandomSentence partOne={nameList} partTwo={verbList} partThree={placeList} />
                <br className='mb-1' />
            </div>

            <div>
                <Header>Mutige Kämpfer</Header>
                <RandomSentence partOne={nameList} partTwo={battleList} partThree={enemieList} partFour={weaponsList} />
                <RandomSentence partOne={nameList} partTwo={battleList} partThree={enemieList} partFour={weaponsList} />
                <RandomSentence partOne={nameList} partTwo={battleList} partThree={enemieList} partFour={weaponsList} />
                <br className='mb-1' />
            </div>
        </div>
    );
};

export default Start;
