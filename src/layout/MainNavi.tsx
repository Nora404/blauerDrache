import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import navigationMap from '../NavigationList';
import GameNavi from '../playground/game/game/GameNavi';
import InfoNavi from '../playground/game/infos/InfoNavi';
import { useGameStore } from '../data/gameStore';
import TransitNavi from '../playground/game/game/TransitNavi';

type MainNaviProps = {
};

const MainNavi: React.FC<MainNaviProps> = () => {
    const location = useLocation();
    const { gameStore: gameData } = useGameStore();

    const [currentNav, setCurrentNav] = useState<JSX.Element | undefined>(undefined);

    useEffect(() => {
        let pathName = location.pathname.split("/");

        if (pathName.length > 2) {
            console.log(pathName);
            console.log("Ein Transit!")
        }

        const NavComponent = navigationMap[location.pathname];
        if (NavComponent && pathName.length <= 2) {
            setCurrentNav(<NavComponent />);
        }
        else if (pathName.length > 2) {
            const navi = <TransitNavi target={pathName[2]} start={pathName[3]} steps={pathName[4]} />
            setCurrentNav(navi);
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