import { SYSTEM } from '../../../data/colorfullStrings';
import { GradientText } from '../../../utility/GradientText';
import { useEffect, useRef } from 'react';
import { getCombinedStats, getPlayerObj, useNewGameStore } from '../../../store/newGameStore';

type NewDayProps = {
    onClose?: () => void
};

const NewDay: React.FC<NewDayProps> = ({ onClose }) => {
    const { store } = useNewGameStore();
    const combined = getCombinedStats(store);
    const selected = getPlayerObj(store);

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
                Das Wetter heute ist {store.gameState.weather} und {store.gameState.temperature}.<br />

                Für heute hast du <GradientText>{combined.rounds}</GradientText> {SYSTEM.Runden}.
                Dein {SYSTEM.Leben} wurden auf <GradientText>{combined.life}</GradientText> aufgefüllt.<br />
                Dein Geist und deine Stimmung sind heute {selected.feeling.label}. {selected.feeling.bonus}. <br />
                Du wappnest dich mit {selected.weapon.label} und ziehst {selected.armor.label} an.<br />
            </p>

            <br />

            {onClose && <button onClick={handleClose}>{SYSTEM.schließen}</button>}
        </div>
    );
};

export default NewDay;