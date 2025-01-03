// MainContent.tsx
import React, { useEffect, useState } from 'react'
import { useGameState } from '../data/gameState'
import RoutesList from '../RoutesList';
import NewDay from '../playground/game/infos/NewDay';
import { useGameStore } from '../data/gameStore';


type MainContentProps = {
}

export const MainContent: React.FC<MainContentProps> = () => {
    const { gameStore } = useGameStore();
    const gameState = useGameState();
    if (!gameState) return null;


    const [showNewDay, setShowNewDay] = useState(false)

    useEffect(() => {
        if (gameState.gameTime === "06:00" && gameStore.meta.creating) {
            setShowNewDay(true)
        }
    }, [gameState.gameTime])

    const closeNewDay = () => {
        setShowNewDay(false)
    }

    return (
        <div className={`main-content ${showNewDay ? 'split' : ''}`}>
            <div className="routes-list milchglas custom-scrollbar">
                <RoutesList />
            </div>


            <div className="new-day milchglas custom-scrollbar">
                {showNewDay && <NewDay onClose={closeNewDay} />}
            </div>
        </div>
    )
}
