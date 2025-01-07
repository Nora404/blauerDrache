//#region [imports]
import React, { } from 'react';
import { GradientText } from '../../../../utility/GradientText';
import Header from '../../../../layout/Header/Header';
import { CREATURE, PLACES } from '../../../../data/colorfullStrings';
import NpcTalk from '../../../../utility/NpcTalk';
import { useNewGameStore } from '../../../../store/newGameStore';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import { useNavigate } from 'react-router-dom';
//#endregion

//#region [prepare]
type NorthGateProps = {
    title?: string;
    onClick?: () => void;
};

const NorthGate: React.FC<NorthGateProps> = () => {
    const { store } = useNewGameStore();
    const navigate = useNavigate();
    //#endregion

    //#region [handler]
    const handleGuardian = () => {
        navigate("/north-gate-guardian");
    }

    const handlePlaque = () => {
        navigate("/north-gate-plaque");
    }
    //#endregion

    //#region [jsx]
    return (
        <div className='max-width'>
            <h2>{PLACES.Nordtor}</h2>

            <div className='text-left'>
                <p className='mb-1'>
                    Du stehst vor den Toren von Lahtheim Es ist mitlerweile {store.gameTime.gameDay}, du spürst die {store.gameState.temperature}e Luft auf deinem Gesicht.
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
                </p><br />

                <ActionButton onClick={handleGuardian} label='Die Wachen um Hilfe bitten' />
                <ActionButton onClick={handlePlaque} label='Die Plakette des Erfolgs betrachten' />
            </div>
        </div>
    );
    //#endregion
};

export default NorthGate;
