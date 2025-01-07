import React from 'react';
import Avatar from './Avatar/Avatar';
import { useNewGameStore } from '../store/newGameStore';
import ActionButton from './ActionButton/ActionButton';

type MobileHeaderProps = {
};

const MobileHeader: React.FC<MobileHeaderProps> = () => {
    const { store } = useNewGameStore();
    if (!store) return;

    const handleClick = () => {
        console.log("item");
    }

    return (
        <div className='flex-row w-full'>
            <Avatar />
            <div className='text-left'>
                Name<br />
                Titel
            </div>
            <div className='text-left'>
                level: 1<br />
                Erfahrung: 111
            </div>
            <div className='text-left'>
                Gold: 11<br />
                Edelsteine: 11
            </div>
            <div className='text-left'>
                Buff<br />
                Debuff
            </div>
            <div className='text-left'>
                <ActionButton onClick={handleClick}>Item Benutzen</ActionButton>
            </div>
        </div>
    );
};

export default MobileHeader;