type ProgressionType = 'linear' | 'geometric';

/**
 * Berechnet den Wert an einem bestimmten Index basierend auf einer Progression.
 *
 * @param startValue - Der Startwert der Progression.
 * @param targetValue - Der Wert, den die Progression an targetIndex erreichen soll.
 * @param targetIndex - Der Index, an dem targetValue erreicht werden soll.
 * @param currentIndex - Der Index, für den der Wert berechnet werden soll.
 * @param type - Der Typ der Progression ('linear' oder 'geometric').
 * @returns Der berechnete Wert am currentIndex.
 */
export function calculateProgression(
    startValue: number,
    targetValue: number,
    targetIndex: number,
    currentIndex: number,
    type: ProgressionType = 'geometric'
): number {
    if (currentIndex < 0) {
        throw new Error("currentIndex muss größer oder gleich 0 sein.");
    }
    if (targetIndex <= 0) {
        throw new Error("targetIndex muss größer als 0 sein.");
    }

    switch (type) {
        case 'linear': {
            const step = (targetValue - startValue) / targetIndex;
            return startValue + step * currentIndex;
        }
    
        case 'geometric': {
            const ratio = Math.pow(targetValue / startValue, 1 / targetIndex);
            return startValue * Math.pow(ratio, currentIndex);
        }
    
        default:
            throw new Error(`Unbekannter Progressionstyp: ${type}`);
    }    
}

export function getScalingFactor(level: number): number {
    // Jede Levelerhöhung erhöht den Faktor um 10%
    return 1 + (level - 1) * 0.1;
}

export function requiredExpForLevel(level: number) {
    return Math.round(
        calculateProgression(100, 9999, 14, level - 1, 'geometric')
    );
}

// BEISPIEL ERFAHRUNG

// const baseExperience = 100;
// const finalExperience = 10000;
// const totalLevels = 20;

// const calculateExperience = (level: number): number => {
//     return Math.round(calculateProgression(baseExperience, finalExperience, totalLevels - 1, level, 'geometric'));
// };

// // Beispiel: Erfahrung für Level 10
// const level = 10;
// const experienceForLevel10 = calculateExperience(level);
// console.log(`Erfahrung für Level ${level}: ${experienceForLevel10}`);
