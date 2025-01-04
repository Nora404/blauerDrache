import React from 'react';
import Header from '../layout/Header/Header';
import { GradientText } from '../utility/GradientText';
import { useNewGameStore } from '../store/newGameStore';

type YouAreProps = {
};

const YouAre: React.FC<YouAreProps> = ({ }) => {

    const { store } = useNewGameStore();

    return (
        <div>
            <Header>Das bist du</Header>
            <p className='text-left padding-left'>
                Name: {store.playerMeta.name}<br />
                Rasse: {store.playerMeta.race.label}<br />
                Herkunft: {store.playerMeta.origin.label}<br />
                Berufung: {store.playerMeta.calling.label}<br />
                Titel: <GradientText>{store.playerMeta.titel}</GradientText><br />
                Stimmung: {store.playerFlux.feeling.label}<br />
            </p>
        </div>
    );
};

export default YouAre;