import { useGameState } from '../../../data/gameState';
import { SYSTEM } from '../../../data/colorfullStrings';
import { GradientText } from '../../../utility/GradientText';

type NewDayProps = {
};

const NewDay: React.FC<NewDayProps> = () => {
    const gameState = useGameState();
    if (!gameState) return null;


    return (
        <div className="max-widht">
            <h3>Es ist ein neuer Tag</h3>
            <div className='text-left'>
                <p className='mb-1'>
                    Du öffnest deine Augen und stellst fest, dass dir ein neuer Tag geschenkt wurde. Für dich ist es dein 1. Tag. Du fühlst dich wieder frisch genug, um die Welt zu erobern!<br />
                </p>

                <p className='mb-1'>
                    Für heute hast du <GradientText>{gameState.combinedStats.rounds}</GradientText> {SYSTEM.Runden}.<br />
                    Deine {SYSTEM.Leben} wurden auf <GradientText>{gameState.combinedStats.maxLife}</GradientText> aufgefüllt.<br />
                    Dein Geist und deine Stimmung sind heute {gameState.selectedFeeling.label}<br />
                    {gameState.selectedFeeling.bonus} <br />
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
            </div>
        </div>
    );
};

export default NewDay;