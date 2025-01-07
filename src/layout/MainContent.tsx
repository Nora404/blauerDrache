// MainContent.tsx
import React, { useEffect, useState } from 'react'
import RoutesList from '../RoutesList';
import NewDay from '../playground/game/infos/NewDay';
import { useNewGameStore } from '../store/newGameStore';


type MainContentProps = {
}

export const MainContent: React.FC<MainContentProps> = () => {
    const { store } = useNewGameStore();
    if (!store) return;

    const [showNewDay, setShowNewDay] = useState(false)

    useEffect(() => {
        if (store.gameTime.gameTime === "06:00" && store.gameState.creating) {
            setShowNewDay(true)
        }
    }, [store.gameTime.gameTime])

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
}
