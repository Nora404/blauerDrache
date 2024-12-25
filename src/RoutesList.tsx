import { Suspense, createElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RouteConfig, routes } from './routes';

function RoutesList() {
    return (
        // Suspense zeigt das Fallback an, während die lazy-Komponenten geladen werden:
        <Suspense fallback={<div>Lade...</div>}> {/* <-- Ladezustand */}
            <Routes>
                {routes.map((route: RouteConfig) => (
                    <Route
                    key={route.path}
                    path={route.path}
                    element={createElement(route.element)}
                    />
                ))}
            </Routes>
        </Suspense>
    );
}

export default RoutesList;
