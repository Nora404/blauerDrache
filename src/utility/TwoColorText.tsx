import React from 'react';

/**
 * Hilfsfunktion zum Parsen einer Hex-Farbe in RGB.
 * @param hex - Die Hex-Farbe als String (z.B. "#FF0000")
 * @returns Ein Objekt mit den RGB-Werten
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    // Entferne das führende #
    hex = hex.replace(/^#/, '');

    // Unterstütze kurze Hex-Codes wie #F00
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    if (hex.length !== 6) {
        return null;
    }

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
}

/**
 * Hilfsfunktion zum Interpolieren zwischen zwei RGB-Farben.
 * @param start - Startfarbe als RGB-Objekt
 * @param end - Endfarbe als RGB-Objekt
 * @param factor - Interpolationsfaktor zwischen 0 und 1
 * @returns Die interpolierte Farbe als RGB-Objekt
 */
function interpolateColor(
    start: { r: number; g: number; b: number },
    end: { r: number; g: number; b: number },
    factor: number
): { r: number; g: number; b: number } {
    const r = Math.round(start.r + (end.r - start.r) * factor);
    const g = Math.round(start.g + (end.g - start.g) * factor);
    const b = Math.round(start.b + (end.b - start.b) * factor);
    return { r, g, b };
}

/**
 * Hilfsfunktion zum Konvertieren von RGB zu Hex.
 * @param color - Farbe als RGB-Objekt
 * @returns Die Hex-Darstellung der Farbe
 */
function rgbToHex(color: { r: number; g: number; b: number }): string {
    const componentToHex = (c: number) => {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${componentToHex(color.r)}${componentToHex(color.g)}${componentToHex(color.b)}`;
}

/**
 * Die Hauptfunktion, die den Farbverlauf auf den String anwendet.
 * @param text - Der Eingabestring
 * @param startColor - Startfarbe im Hex-Format (z.B. "#FF0000")
 * @param endColor - Endfarbe im Hex-Format (z.B. "#0000FF")
 * @returns Ein JSX-Element mit gefärbten Buchstaben
 */
function TwoColorText(
    text: string,
    startColor: string,
    endColor: string
): JSX.Element {
    const startRGB = hexToRgb(startColor);
    const endRGB = hexToRgb(endColor);

    if (!startRGB || !endRGB) {
        return <span>Ungültige Farbwerte</span>;
    }

    const length = text.length;
    return (
        <span>
            {Array.from(text).map((char, index) => {
                const factor = length === 1 ? 0 : index / (length - 1);
                const interpolatedColor = interpolateColor(startRGB, endRGB, factor);
                const colorHex = rgbToHex(interpolatedColor);
                return (
                    <span key={index} style={{ color: colorHex }}>
                        {char}
                    </span>
                );
            })}
        </span>
    );
}

export default TwoColorText;

/*
    const text = "Hallo Welt!";
    const startColor = "#FF0000"; // Rot
    const endColor = "#0000FF";   // Blau

    return (
        <div>
            <h1>
                <GradientText text={text} startColor={startColor} endColor={endColor} />
            </h1>
        </div>
    );
*/