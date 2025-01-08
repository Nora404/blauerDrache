import React, { useState } from 'react';
import ActionButton from '../ActionButtons/ActionButton';
import './MobilePop.css'

type MobileFooterProps = {
};

const MobileFooter: React.FC<MobileFooterProps> = () => {
    const [showGame, setShowGame] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showNavi, setShowNavi] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);

    const handleGame = () => {
        setShowGame(prev => !prev);
        setShowInfo(false);
        setShowNavi(false);
        setShowPlayer(false);
    }
    const handleInfo = () => {
        setShowInfo(prev => !prev);
        setShowPlayer(false);
        setShowNavi(false);
        setShowGame(false);
    }
    const handleNavi = () => {
        setShowNavi(prev => !prev);
        setShowInfo(false);
        setShowPlayer(false);
        setShowGame(false);
    }
    const handlePlayer = () => {
        setShowPlayer(prev => !prev);
        setShowInfo(false);
        setShowNavi(false);
        setShowGame(false);
    }

    return (
        <>
            <div id='handyPop' className={`custom-scrollbar ${showGame ? 'open' : 'closed'}`}>Hallo Game</div>
            <div id='handyPop' className={`custom-scrollbar ${showInfo ? 'open' : 'closed'}`}>Hallo Info</div>
            <div id='handyPop' className={`custom-scrollbar ${showNavi ? 'open' : 'closed'}`}>Hallo Navi</div>
            <div id='handyPop' className={`custom-scrollbar ${showPlayer ? 'open' : 'closed'}`}>Hallo Player</div>

            <ActionButton onClick={handleGame} label='Game' />
            <ActionButton onClick={handleInfo} label='Info' />
            <ActionButton onClick={handleNavi} label='Navi' />
            <ActionButton onClick={handlePlayer} label='Player' />
        </>
    );
};

export default MobileFooter;