import React from 'react';
import { getPlayerObj, useNewGameStore } from '../../store/newGameStore';
import "./Avatar.css"

type AvatarProps = {
};

const Avatar: React.FC<AvatarProps> = () => {
    const { store } = useNewGameStore();
    const selected = getPlayerObj(store);

    const isDay = store.gameTime.gameDay === "Tag";

    return (
        <div className={`avatar ${isDay ? 'day' : 'night'}`}>
            {selected.race.ascii}
        </div>
    );
};

export default Avatar;