import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy Imports 
const Start = lazy(() => import('./playground/lahtheim/cityLimit/northGate/NorthGate'));
const WhatIs = lazy(() => import('./playground/game/infos/WhatIs'));
const CreatePlayer = lazy(() => import('./playground/game/newPlayer/CreatePlayer'));
const Map = lazy(() => import('./playground/game/otherThings/Map'));
const ChooseOrigin = lazy(() => import('./playground/game/newPlayer/ChooseOrigin'));

function RoutesList() {
    return (
        // Suspense zeigt das Fallback an, während die lazy-Komponenten geladen werden:
        <Suspense fallback={<div>Lade...</div>}> {/* <-- Ladezustand */}
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/start" element={<Start />} />
                <Route path="/whatIs" element={<WhatIs />} />
                <Route path="/charakter" element={<CreatePlayer />} />
                <Route path="/map" element={<Map />} />
                <Route path="/chooseOrigin" element={<ChooseOrigin />} />
            </Routes>
        </Suspense>
    );
}

export default RoutesList;
