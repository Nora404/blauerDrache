//#region [imports]
import React, { } from 'react';
import drache from '../../../assets/drache-01.png';
import { CREATURE } from '../../../data/colorfullStrings';
import { NAMELIST, VERBLIST, PLACELIST, BATTLELIST, ENEMIELIST, WEAPONSLIST } from '../../../data/randomSentenceData';
import Header from '../../../layout/Header/Header';
import { GradientText } from '../../../utility/GradientText';
import NpcTalk from '../../../utility/NpcTalk';
import RandomSentence from '../../../utility/RandomSentence';
import ActionButton from '../../../layout/ActionButtons/ActionButton';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../store';
//#endregion

//#region [prepare]
type StartProps = {
    title?: string;
    onClick?: () => void;
};

const Start: React.FC<StartProps> = observer(() => {
    const { gameState, gameTime } = useRootStore();
    //#endregion

    //#region [handler]
    const handleCreateCharakter = () => {
        navigation("/new-player")
    }
    const navigation = useNavigate();
    //#endregion

    //#region [jsx]
    return (
        <div className='max-width'>
            <p className='mb-1'>
                Willkommen bei <b>Legende des blauen Drachen</b>, <br />
                ein browser-basiertes Rollenspiel, inspiriert von der &nbsp;
                <a href="https://lotgd.de/home.php?" target='blank'><GradientText colors={["#0066ff", "#00ff00"]}>Legende des grünen Drachen</GradientText></a><br />
            </p>

            <p className='mb-1'>
                Die aktuelle Uhrzeit in Lahtheim ist <b>{gameTime.data.gameTime} Uhr.</b> Es ist <b>{gameTime.data.gameDay}</b>.
                Das Wetter heute ist {gameState.data.weather} und {gameState.data.temperature}.
            </p>

            <img src={drache} width={"30%"} />

            <div className='text-left'>
                <p className='mb-1'>
                    Du stehst vor den Toren von Lahtheim Es ist mitlerweile {gameTime.data.gameDay}, du spürst die {gameState.data.temperature}e Luft auf deinem Gesicht.
                    Bevor du auch nur einen Schritt gehen kannst,
                    kommt ein kleines <GradientText colors={['#CF388F', '#8839CF']}>geflügeltes Wesen</GradientText> zu dir.
                    Mit großen Augen schaut es erwartungsvoll zu dir hoch.
                    Im nächsten Moment fängt es mit schriller Stimme an zu reden:
                </p>

                <p className='mb-1'>
                    <NpcTalk name="geflügeltesWesen">
                        „Willkommen in Lahtheim! Bist du hier, um vor den Bezwingern des {CREATURE.grünerDrache} zu fliehen?
                        In unserem Dorf ist Platz für dich. Sei nett, dann darfst du vielleicht einmal den {CREATURE.blauerDrache} besuchen.“
                    </NpcTalk>
                </p>

                <p className='mb-1'>
                    Ohne auf deine Antwort zu warten dreht sich das <GradientText colors={['#CF388F', '#8839CF']}>geflügelte Wesen</GradientText> um und flattert durch den Torbogen Richtung Brunnen davon.
                </p>
            </div>

            {!gameState.data.creating && (<ActionButton onClick={handleCreateCharakter} label='Charater erstellen' />)}<br /><br />

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
    //#endregion
});

export default Start;
