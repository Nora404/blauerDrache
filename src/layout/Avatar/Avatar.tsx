import React from 'react';
import { getPlayerObj, useNewGameStore } from '../../store/newGameStore';
import "./Avatar.css"

type AvatarProps = {
};

const Avatar: React.FC<AvatarProps> = () => {
    const { store } = useNewGameStore();
    const selected = getPlayerObj(store);

    return (
        <div className='avatar'>
            {selected.race.ascii}
        </div>
    );
};

export default Avatar;