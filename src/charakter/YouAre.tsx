import React from 'react';
import Header from '../layout/Header/Header';
import { GradientText } from '../utility/GradientText';
import { getPlayerObj, useNewGameStore } from '../store/newGameStore';

type YouAreProps = {
};

const YouAre: React.FC<YouAreProps> = ({ }) => {

    const { store } = useNewGameStore();
    const selected = getPlayerObj(store);

    return (
        <div>
            <Header>Das bist du</Header>
            <p className='text-left padding-left'>
                Name: {store.playerMeta.name}<br />
                Rasse: {selected.race.label}<br />
                Herkunft: {selected.origin.label}<br />
                Berufung: {selected.calling.label}<br />
                Titel: <GradientText>{store.playerMeta.titel}</GradientText><br />
                Stimmung: {selected.feeling.label}<br />
            </p>
        </div>
    );
};

export default YouAre;