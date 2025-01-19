import React from 'react';
import "./Avatar.css"
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../store';

type AvatarProps = {
};

const Avatar: React.FC<AvatarProps> = observer(() => {
    const { getPlayerObj, gameTime } = useRootStore();
    const selected = getPlayerObj();

    const isDay = gameTime.data.gameDay === "Tag";

    return (
        <div className={`avatar ${isDay ? 'day' : 'night'}`}>
            {selected.race.ascii}
        </div>
    );
});

export default Avatar;