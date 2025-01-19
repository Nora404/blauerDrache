import React from 'react';
import Header from '../layout/Header/Header';
import { GradientText } from '../utility/GradientText';
import { useRootStore } from '../store';
import { observer } from 'mobx-react-lite';

type YouAreProps = {
};

const YouAre: React.FC<YouAreProps> = observer(() => {

    const { playerMeta, getPlayerObj } = useRootStore();
    const selected = getPlayerObj();

    return (
        <div>
            <Header>Das bist du</Header>
            <p className='text-left padding-left'>
                Name: {playerMeta.data.name}<br />
                Rasse: {selected.race.label}<br />
                Herkunft: {selected.origin.label}<br />
                Berufung: {selected.calling.label}<br />
                Titel: <GradientText>{playerMeta.data.titel}</GradientText><br />
                Stimmung: {selected.feeling.label}<br />
                Buff: <span className={
                    selected.buffs.length > 0 ? "text-green" : "text-gray"}>{selected.buffs.length} aktiv</span><br />
                Debuff: <span className={
                    selected.debuffs.length > 0 ? "text-red" : "text-gray"}>{selected.debuffs.length} aktiv</span><br />
            </p>
        </div>
    );
});

export default YouAre;