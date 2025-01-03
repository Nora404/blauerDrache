import React from 'react';
import PlayerTalk from '../../../../utility/PlayerTalk';

type PlaqueProps = {
};

const Plaque: React.FC<PlaqueProps> = () => {
    return (
        <div className='max-width'>
            <h2>Plakette</h2>
            <p className='mb-1 text-left'>
                Du erkennst an der steinernden Mauer eine alte vermoose Plakette. Es ist nicht mehr zu erkennen was dort einmal gestanden haben könnte.
                Neugierig näherst du dich ihr. Auf dem Boden liegen Kerzenreste, etwas das einmal ein Stück Papier gewesen ist und ein sehr verwittertes ... Irgendwas.
                Es könnte ein Schwert gewesen sein, oder doch nur ein alter Stock. Beim zweiten Blick auf die Plakette fällt dir auf, das im Stein daneben etwas eingerizt wurde.
                Mit viel Fantasie erkennst du die Worte:
            </p>
            <p className='mb-1'>
                <PlayerTalk>"Suche den blauen Drachen ..."</PlayerTalk>
            </p>

            <p className='mb-1 text-left'>
                Der Rest besteht nur noch aus Linien die beim besten Willen keine Buchstaben mehr werden wollen.
            </p>
        </div>
    );
};

export default Plaque;