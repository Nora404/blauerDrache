// Neue Variante mit weniger Vendor-Code

import { useState, useEffect } from 'react';

const FullscreenToggleButton = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Nur relevante Stellen anzeigen
    // --- Änderungen ---
    useEffect(() => {
        const handleChange = () => {
            // Prüft, ob gerade ein Element im Vollbildmodus ist
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleChange);
        };
    }, []);
    // --- Ende Änderungen ---

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            // Vollbildmodus aktivieren
            document.documentElement.requestFullscreen();
        } else {
            // Vollbildmodus beenden
            document.exitFullscreen();
        }
    };

    return (
        <button className="btn-border" onClick={toggleFullscreen}>
            {isFullscreen ? 'Vollbildmodus beenden' : 'Vollbildmodus aktivieren'}
        </button>
    );
};

export default FullscreenToggleButton;
