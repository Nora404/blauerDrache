import React from 'react';
import Avatar from '../Avatar/Avatar';
import { SYSTEM } from '../../data/colorfullStrings';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../store';

type MobileHeaderProps = {
};

const MobileHeader: React.FC<MobileHeaderProps> = observer(() => {
    const { playerBase, playerEconomy, playerMeta, getCombinedStats, getPlayerObj } = useRootStore();
    const selected = getPlayerObj();
    const combined = getCombinedStats();

    const percentage = playerBase.data.nextLevel > 0 ? (playerBase.data.exp / playerBase.data.nextLevel) * 100 : 0;
    const formattedPercentage = percentage.toFixed(1);

    const handleConsume = () => {
        playerEconomy.consumeItem(selected.item.name);
    }

    return (
        <div className='flex-row w-full'>
            <Avatar />
            <div id="header0" className='text-left'>
                {playerMeta.data.name}<br />
                Titel: {playerMeta.data.titel}
            </div>
            <div id="header1" className='text-left'>
                {SYSTEM.Leben}: {combined.life} / {combined.maxLife}<br />
                {SYSTEM.Runden}: {combined.rounds} / {combined.maxRounds}
            </div>
            <div id="header2" className='text-left'>
                {SYSTEM.Level}: {playerBase.data.level}<br />
                {SYSTEM.Erfahrung}: {formattedPercentage}%
            </div>
            <div id="header3" className='text-left'>
                {SYSTEM.Gold}: {playerEconomy.data.gold || '0'}<br />
                {SYSTEM.Edelsteine}: {playerEconomy.data.edelsteine || '0'}
            </div>
            <div id="header4" className='text-left'>
                <span className={selected.buffs.length > 0 ? "text-green" : "text-gray"}>Buff: {selected.buffs.length}</span><br />
                <span className={selected.debuffs.length > 0 ? "text-red" : "text-gray"}>Debuff: {selected.debuffs.length}</span>
            </div>
            <div className='text-left'>
                {selected.item.effects && (
                    <button className='btn-border' onClick={handleConsume}>
                        {selected.item.name} benutzen
                    </button>
                )}
            </div>
        </div>
    );
});

export default MobileHeader;