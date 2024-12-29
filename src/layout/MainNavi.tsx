import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import navigationMap from '../NavigationList';
import GameNavi from '../playground/game/game/GameNavi';
import InfoNavi from '../playground/game/infos/InfoNavi';
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
            <GameNavi />
            {gameData.meta.creating && (currentNav)}
            <InfoNavi />
        </div>
    );
};

export default MainNavi;