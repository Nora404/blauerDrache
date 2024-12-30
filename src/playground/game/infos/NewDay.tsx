import { useGameState } from '../../../data/gameState';
import { SYSTEM } from '../../../data/colorfullStrings';
import { GradientText } from '../../../utility/GradientText';
import Header from '../../../layout/Header/Header';
import { useGameStore } from '../../../data/gameStore';

type NewDayProps = {
    onClose?: () => void
};

const NewDay: React.FC<NewDayProps> = ({ onClose }) => {
    const { gameStore: gameData } = useGameStore();
    const gameState = useGameState();
    if (!gameState) return null;

    const handleClose = () => {
        onClose?.();
    }

    return (
        <div className="max-width">
            <h2>Es ist ein neuer Tag</h2>
            <p className='mb-1 text-left'>
                Du öffnest deine Augen und stellst fest, dass dir ein neuer Tag geschenkt wurde. Für dich ist es dein 1. Tag. Du fühlst dich wieder frisch genug, um die Welt zu erobern!<br />
            </p>

            <Header>Deine heutigen Werte</Header>
            <p className='mb-1 text-left'>
                Für heute hast du <GradientText>{gameState.combinedStats.rounds}</GradientText> {SYSTEM.Runden}.
                Deine {SYSTEM.Leben} wurden auf <GradientText>{gameState.combinedStats.maxLife}</GradientText> aufgefüllt.<br />
                Dein Geist und deine Stimmung sind heute {gameState.selectedFeeling.label}. {gameState.selectedFeeling.bonus} <br />
                Du wappnest dich mit {gameData.equipment.weapon} und ziehst {gameData.equipment.armor} an. <br />
                Auf gehts, neue Abenteuer rufen nach dir!<br className='mb-1' />
            </p>

            <Header>Deine gestrigen Leistungen</Header>
            <p className='mb-1 text-left'>
                Beim Rückblick auf den gestrigen Tag stellst du fest, dass:<br />
                Du rein gar nichts dazugelernt hast und 1 Level aufgestiegen bist.<br />
                Du 150 Goldmünzen mehr auf der Hand hast.<br />
                Dein Edelsteinvorrat konstant bei 0 Edelsteinen liegt.<br />
                Dir dein Aussehen völlig egal ist.<br />
                Dir dein Ruf völlig egal ist.<br />
                Die Leute dich genauso ansehen wie gestern.<br className='mb-1' />
            </p>

            {onClose && <button onClick={handleClose}>{SYSTEM.schließen}</button>}
        </div>
    );
};

export default NewDay;