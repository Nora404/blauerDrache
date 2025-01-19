//#region [imports]
import React, { useEffect, useState } from 'react';
import './MobilePop.css'
import GameNavi from '../../playground/game/game/GameNavi';
import InfoNavi from '../../playground/game/infos/InfoNavi';
import CharakterNavi from '../CharakterNavi';
import navigationMap from '../../NavigationList';
import TransitNavi from '../../playground/game/game/TransitNavi';
import { useLocation } from 'react-router-dom';
import ToggleActionButton from '../ActionButtons/ToggleActionButton';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../store';
//#endregion

//#region [prepare]
type MobileFooterProps = {
};

const MobileFooter: React.FC<MobileFooterProps> = observer(() => {
    const [showGame, setShowGame] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showNavi, setShowNavi] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const [currentNav, setCurrentNav] = useState<JSX.Element | undefined>(undefined);
    const location = useLocation();
    const { gameState } = useRootStore();

    const closePop = () => {
        setShowGame(false);
        setShowInfo(false);
        setShowNavi(false);
        setShowPlayer(false);
    }

    const handleGame = () => {
        setShowGame(prev => !prev);
        setShowInfo(false);
        setShowNavi(false);
        setShowPlayer(false);
        gameState.data.mobilePop = true;
    }
    const handleInfo = () => {
        setShowInfo(prev => !prev);
        setShowPlayer(false);
        setShowNavi(false);
        setShowGame(false);
        gameState.data.mobilePop = true;
    }
    const handleNavi = () => {
        setShowNavi(prev => !prev);
        setShowInfo(false);
        setShowPlayer(false);
        setShowGame(false);
        gameState.data.mobilePop = true;
    }
    const handlePlayer = () => {
        setShowPlayer(prev => !prev);
        setShowInfo(false);
        setShowNavi(false);
        setShowGame(false);
        gameState.data.mobilePop = true;
    }
    //#endregion

    useEffect(() => {
        if (!gameState.data.mobilePop) {
            closePop();
        }
    }, [gameState.data.mobilePop]);

    //#region [events]
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
    //#endregion

    //#region [jsx]
    return (
        <>
            <div className={`handyPop custom-scrollbar ${showGame ? 'open' : 'closed'}`}><GameNavi mobilePop={handleGame} /></div>
            <div className={`handyPop custom-scrollbar ${showInfo ? 'open' : 'closed'}`}><InfoNavi mobilePop={handleInfo} /></div>
            <div className={`handyPop custom-scrollbar ${showNavi ? 'open' : 'closed'}`}>{gameState.data.creating && (currentNav)}</div>
            <div className={`handyPop custom-scrollbar ${showPlayer ? 'open' : 'closed'}`}><CharakterNavi /></div>

            <ToggleActionButton onClickOne={handleGame} labelOne="Game" labelTwo="Schließen" colorTwo="#F7445C" setOne={!showGame} />
            <ToggleActionButton onClickOne={handleInfo} labelOne="Info" labelTwo="Schließen" colorTwo="#F7445C" setOne={!showInfo} />
            <ToggleActionButton onClickOne={handleNavi} labelOne="Navi" labelTwo="Schließen" colorTwo="#F7445C" setOne={!showNavi} />
            <ToggleActionButton onClickOne={handlePlayer} labelOne="Player" labelTwo="Schließen" colorTwo="#F7445C" setOne={!showPlayer} />

        </>
    );
    //#endregion
});

export default MobileFooter;