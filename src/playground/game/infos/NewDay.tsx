import { SYSTEM } from '../../../data/colorfullStrings';
import { GradientText } from '../../../utility/GradientText';
import { getCombinedStats, getPlayerObj, useNewGameStore } from '../../../store/newGameStore';
import PlayerTalk from '../../../utility/PlayerTalk';
import ActionButton from '../../../layout/ActionButtons/ActionButton';

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

    return (
        <div className="max-width">
            <h2>Es ist ein neuer Tag</h2>

            <p className='mb-1 text-left'>
                Das Wetter heute ist {store.gameState.weather} und {store.gameState.temperature}.<br />

                Für heute hast du <GradientText>{combined.rounds}</GradientText> {SYSTEM.Runden}.
                Dein {SYSTEM.Leben} wurden auf <GradientText>{combined.life}</GradientText> aufgefüllt.<br />
                Dein Geist und deine Stimmung sind heute {selected.feeling.label}. {selected.feeling.bonus}. <br />
                Du stellst fest das alle <b>Buffs</b> und <b>Debuffs</b> sich aufgelöst haben<br />
                Du wappnest dich mit {selected.weapon.label} und ziehst {selected.armor.label} an.<br /><br />

                <PlayerTalk>"Ein neuer Tag, ein neues Abendteuer!"</PlayerTalk>
            </p>

            <br />

            {onClose && <ActionButton onClick={handleClose} label='schließen' />}
        </div>
    );
};

export default NewDay;