import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import navigationMap from '../NavigationList';
import GameNavi from '../playground/game/game/GameNavi';
import InfoNavi from '../playground/game/infos/InfoNavi';
import TransitNavi from '../playground/game/game/TransitNavi';
import { useNewGameStore } from '../store/newGameStore';

type MainNaviProps = {
};

const MainNavi: React.FC<MainNaviProps> = () => {
    const location = useLocation();
    const { store } = useNewGameStore();
    if (!store) return;

    const [currentNav, setCurrentNav] = useState<JSX.Element | undefined>(undefined);

    useEffect(() => {
        let pathName = location.pathname.split("/");

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
            {store.gameState.creating && (currentNav)}
            {store.gameState.creating && <InfoNavi />}
        </div>
    );
};

export default MainNavi;