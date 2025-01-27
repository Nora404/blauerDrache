// MainContent.tsx
import React, { useEffect, useState } from 'react'
import RoutesList from '../RoutesList';
import NewDay from '../playground/game/infos/NewDay';
import { useRootStore } from '../store';

export const MainContent: React.FC = (() => {
    const { gameState, gameTime } = useRootStore();

    const [showNewDay, setShowNewDay] = useState(false)

    useEffect(() => {
        if (gameTime.data.gameTime === "06:00" && gameState.data.creating) {
            setShowNewDay(true)
        }
    }, [gameState.data.creating, gameTime.data.gameTime])

    const closeNewDay = () => {
        setShowNewDay(false)
    }

    return (
        <div id="mainContent" className={`main-content ${showNewDay ? 'split' : ''}`}>
            <div className="routes-list milchglas custom-scrollbar">
                <RoutesList />
            </div>


            <div id="newDayPop" className="new-day milchglas custom-scrollbar">
                {showNewDay && <NewDay onClose={closeNewDay} />}
            </div>
        </div>
    )
});
