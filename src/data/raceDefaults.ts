export type RaceName = "Mensch" | "Elf" | "Zwerg" | "Echse" | "Troll" | "Felkin" | "Fenril" | "Dryade";

export const races = [
    { name: "Mensch", label: "Mensch (+ Leben)" },
    { name: "Elf", label: "Elf (+ Level)" },
    { name: "Zwerg", label: "Zwerg (+ Gold)" },
    { name: "Echse", label: "Echse (+ Angriff)" },
    { name: "Troll", label: "Troll (+ Verteidigung)" },
    { name: "Felkin", label: "Felkin (+ Glück)" },
    { name: "Fenril", label: "Fenril (+ Runden)" },
    { name: "Dryade", label: "Dryade (+ Leben)" },
]

export const raceDefaults = {
    Mensch: {
        stats: {
            life: 120,
            maxLife: 120,
        }
    },
    Elf: {
        stats: {
            level: 3,
        }
    },
    //TODO Gold ist kein stats, sondern economy
    Zwerg: {
        stats: {
            gold: 200,
        }
    },
    Echse: {
        stats: {
            attack: 15,
        }
    },
    Troll: {
        stats: {
            defense: 15,
        }
    },
    Felkin: {
        stats: {
            luck: 15,
        }
    },
    Fenril: {
        stats: {
            rounds: 20,
            maxRounds: 20,
        }
    },
    Dryade: {
        stats: {
            life: 150,
            maxLife: 150,
        }
    },
}
