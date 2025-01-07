import React from 'react';
import Avatar from './Avatar/Avatar';
import { getCombinedStats, getPlayerObj, useNewGameStore } from '../store/newGameStore';
import { SYSTEM } from '../data/colorfullStrings';

type MobileHeaderProps = {
};

const MobileHeader: React.FC<MobileHeaderProps> = () => {
    const { store, consumeItem } = useNewGameStore();
    if (!store) return;
    const selected = getPlayerObj(store);
    const combined = getCombinedStats(store);

    const percentage = store.playerBase.nextLevel > 0 ? (store.playerBase.exp / store.playerBase.nextLevel) * 100 : 0;
    const formattedPercentage = percentage.toFixed(1);

    const handleConsume = () => {
        consumeItem(selected.item.name);
    }

    return (
        <div className='flex-row w-full'>
            <Avatar />
            <div id="header0" className='text-left'>
                {store.playerMeta.name}<br />
                Titel: {store.playerMeta.titel}
            </div>
            <div id="header1" className='text-left'>
                {SYSTEM.Leben}: {combined.life} / {combined.maxLife}<br />
                {SYSTEM.Runden}: {combined.rounds} / {combined.maxRounds}
            </div>
            <div id="header2" className='text-left'>
                {SYSTEM.Level}: {store.playerBase.level}<br />
                {SYSTEM.Erfahrung}: {formattedPercentage}%
            </div>
            <div id="header3" className='text-left'>
                {SYSTEM.Gold}: {store.playerEconomy.gold || '0'}<br />
                {SYSTEM.Edelsteine}: {store.playerEconomy.edelsteine || '0'}
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
};

export default MobileHeader;