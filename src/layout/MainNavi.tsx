import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import navigationMap from '../NavigationList';
import NewPlayer from '../playground/game/newPlayer/CreatePlayerNavi';
import OtherThingsNavi from '../playground/game/otherThings/OtherThingsNavi';
import { useGameStore } from '../data/gameStore';

type MainNaviProps = {
};

const MainNavi: React.FC<MainNaviProps> = () => {
    const location = useLocation();
    const { gameData } = useGameStore();

    const [currentNav, setCurrentNav] = useState<JSX.Element | undefined>(undefined);

    useEffect(() => {
        const NavComponent = navigationMap[location.pathname];
        if (NavComponent) {
            setCurrentNav(<NavComponent />);
        }
    }, [location.pathname]);


    return (
        <div>
            <NewPlayer />
            {gameData.meta.creating && (currentNav)}
            <OtherThingsNavi />
        </div>
    );
};

export default MainNavi;