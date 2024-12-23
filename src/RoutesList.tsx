import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy Imports 
const Start = lazy(() => import('./playground/Start'));
const WhatIs = lazy(() => import('./playground/WhatIs'));
const CreatePlayer = lazy(() => import('./playground/CreatePlayer'));
const Map = lazy(() => import('./playground/Map'));

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
            </Routes>
        </Suspense>
    );
}

export default RoutesList;
