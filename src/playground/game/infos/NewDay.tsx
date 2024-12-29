import React from 'react';
import { useGameState } from '../../../data/gameState';

type NewDayProps = {
};

const NewDay: React.FC<NewDayProps> = () => {
    const gameState = useGameState();
    if (!gameState) return null;

    const handleTest = (n: number) => {
        gameState.updateEphemeralStats({ life: n })
    }

    return (
        <div className="max-widht">
            <h3>Es ist ein neuer Tag</h3>
            <div className='text-left'>
                <p className='mb-1'>
                    Du öffnest deine Augen und stellst fest, dass dir ein neuer Tag geschenkt wurde. Für dich ist es dein 1. Tag. Du fühlst dich wieder frisch genug, um die Welt zu erobern!<br />
                </p>

                <p className='mb-1'>
                    Für heute hast du 20 Runden.<br />
                    Deine Lebenspunkte wurden auf 10 aufgefüllt.<br />
                    Dein Geist und deine Stimmung sind heute Normal!<br />
                    Du wappnest dich mit Fäuste und ziehst auf neue Abenteuer aus.<br className='mb-1' />
                </p>

                <p className='mb-1'>
                    Beim Rückblick auf den gestrigen Tag stellst du fest, dass:<br />
                    Du rein gar nichts dazugelernt hast und 1 Level aufgestiegen bist.<br />
                    Du 150 Goldmünzen mehr auf der Hand hast.<br />
                    Du der Bank 100 Goldmünzen mehr anvertraut hast.<br />
                    Dein Edelsteinvorrat konstant bei 0 Edelsteinen liegt.<br />
                    Dir dein Aussehen völlig egal ist.<br />
                    Dir dein Ruf völlig egal ist.<br />
                    Die Leute dich genauso ansehen wie gestern.<br className='mb-1' />
                </p>

                <button onClick={() => handleTest(20)}>Füge 20 Leben dazu</button><br />
                <button onClick={() => handleTest(-15)}>Entferne 15 Leben</button><br />
                Das aktuelle Leben ist: {gameState.combinedStats.life}
            </div>
        </div>
    );
};

export default NewDay;