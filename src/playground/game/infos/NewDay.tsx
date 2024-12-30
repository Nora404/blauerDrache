import { useGameState } from '../../../data/gameState';
import { SYSTEM } from '../../../data/colorfullStrings';
import { GradientText } from '../../../utility/GradientText';
import Header from '../../../layout/Header/Header';
import { useGameStore } from '../../../data/gameStore';
import { useEffect, useRef } from 'react';

type NewDayProps = {
    onClose?: () => void
};

const NewDay: React.FC<NewDayProps> = ({ onClose }) => {
    const { gameStore } = useGameStore();
    const gameState = useGameState();
    if (!gameState) return null;

    const handleClose = () => {
        onClose?.();
    }


    // Eigentlich sollte das hier bewirken das die Komponente immer 
    // nach ganz oben zum Anfang der Seite gescollt ist.
    // Aber es hat keine Wirkung
    const newDayRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (newDayRef.current) {
            newDayRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, []);

    return (
        <div className="max-width" ref={newDayRef}>
            <h2>Es ist ein neuer Tag</h2>

            <p className='mb-1 text-left'>
                Das Wetter heute ist {gameStore.meta.weather} und {gameStore.meta.temperature}.<br />

                Für heute hast du <GradientText>{gameState.combinedStats.rounds}</GradientText> {SYSTEM.Runden}.
                Dein {SYSTEM.Leben} wurden auf <GradientText>{gameState.combinedStats.maxLife}</GradientText> aufgefüllt.<br />
                Dein Geist und deine Stimmung sind heute {gameState.selectedFeeling.label}. {gameState.selectedFeeling.bonus}. <br />
                Du wappnest dich mit {gameStore.equipment.weapon} und ziehst {gameStore.equipment.armor} an.<br />
            </p>

            <br />

            <Header>Beim Rückblick auf den gestrigen Tag stellst du fest, dass ...</Header>
            <p className='mb-1 text-left'>
                ... du 150 Goldmünzen und 0 Edelsteine mehr auf der Hand hast.<br />
                ... du rein gar nichts dazugelernt hast und 1 Level aufgestiegen bist.<br />
                ... du 0 Feinde bekämpft hast.<br />
            </p>

            {onClose && <button onClick={handleClose}>{SYSTEM.schließen}</button>}
        </div>
    );
};

export default NewDay;