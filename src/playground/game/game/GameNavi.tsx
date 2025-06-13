import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../layout/Header/Header';
import MultiColoredLetters from '../../../utility/Formatted/MultiColoredLetters';
import { blueColors } from '../../../data/helper/colorMappingData';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../store';

type GameNaviProps = {
    mobilePop?: () => void;
};

const GameNavi: React.FC<GameNaviProps> = observer(({ mobilePop }) => {
    const { gameState } = useRootStore();

    const handleClick = () => {
        mobilePop?.();
    }

    return (
        <Suspense fallback={<div>Lädt…</div>}>
            <div>
                <Header>Spiel</Header>
                <p className='text-left'>
                    <Link onClick={handleClick} to="/start" className='mobileBtn'><MultiColoredLetters colors={blueColors}>Tor von Lahtheim</MultiColoredLetters></Link><br />
                    {!gameState.data.creating && <><Link onClick={handleClick} to="/new-player" className='mobileBtn'><MultiColoredLetters colors={blueColors}>Erstelle neuen Charakter</MultiColoredLetters></Link><br /></>}
                    <Link onClick={handleClick} to="/whatIs" className='mobileBtn'><MultiColoredLetters colors={blueColors}>Über dieses Spiel</MultiColoredLetters></Link><br />
                    <Link onClick={handleClick} to="/map" className='mobileBtn'><MultiColoredLetters colors={blueColors}>Karte von Lahtheim</MultiColoredLetters></Link><br />
                    <Link onClick={handleClick} to="/chronic" className='mobileBtn'><MultiColoredLetters colors={blueColors}>Chroniken von Aurendia</MultiColoredLetters></Link><br />
                    <Link onClick={handleClick} to="/setting" className='mobileBtn'><MultiColoredLetters colors={blueColors}>Einstellungen</MultiColoredLetters></Link><br />
                </p>
            </div>
        </Suspense>
    );
});

export default GameNavi;