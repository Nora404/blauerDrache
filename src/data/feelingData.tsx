import { GradientText } from "../utility/GradientText";
import { SYSTEM } from "./colorfullStrings";
import { PlayerStats } from "./gameStore";

export type Feeling = {
    name: string,
    label: JSX.Element;
    bonus: JSX.Element;
}

export const emptyFeelingObj: Feeling = {
    name: "Normal",
    label: <GradientText colors={['#eeeeee', '#dddddd']}>Normal</GradientText>,
    bonus: <>Stimmung beeinflusst deine Werte nicht</>,
}

export const feelings: Feeling[] = [
    {
        name: "Normal",
        label: <GradientText colors={['#eeeeee', '#dddddd']}>Normal</GradientText>,
        bonus: <>Stimmung beeinflusst deine Werte nicht</>,
    },

    {
        name: "Unzufrieden",
        label: <GradientText colors={['#FF725B', '#D46A30']}>Unzufrieden</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Glück} sind für heute gesunken</>,
    },
    {
        name: "Hoffnungslos",
        label: <GradientText colors={['#FFA53B', '#D42416']}>Hoffnungslos</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Glück} sind für heute gesunken</>,
    },
    {
        name: "Ausgelaugt",
        label: <GradientText colors={['#D42416', '#FF725B']}>Ausgelaugt</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Leben} sind für heute gesunken</>,
    },
    {
        name: "Melancholisch",
        label: <GradientText colors={['#FF725B', '#FFA53B']}>Melancholisch</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Leben} sind für heute gesunken</>,
    },
    {
        name: "Antriebslos",
        label: <GradientText colors={['#FFA53B', '#D42416']}>Antriebslos</GradientText>,
        bonus: <>Deine Anzahl der {SYSTEM.Runden} sind für heute gesunken</>,
    },
    {
        name: "Ängstlich",
        label: <GradientText colors={['#D46A30', '#FF725B']}>Ängstlich</GradientText>,
        bonus: <>Deine Anzahl der {SYSTEM.Runden} sind für heute gesunken</>,
    },
    {
        name: "Unsicher",
        label: <GradientText colors={['#FF725B', '#D46A30']}>Unsicher</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Angriff} sind für heute gesunken</>,
    },
    {
        name: "Skeptisch",
        label: <GradientText colors={['#D42416', '#D46A30']}>Skeptisch</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Angriff} sind für heute gesunken</>,
    },
    {
        name: "Leichtsinnig",
        label: <GradientText colors={['#D46A30', '#FFA53B']}>Leichtsinnig</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Verteidigung} sind für heute gesunken</>,
    },
    {
        name: "Erleichtert",
        label: <GradientText colors={['#D46A30', '#FF725B']}>Erleichtert</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Verteidigung} sind für heute gesunken</>,
    },


    {
        name: "Zufrieden",
        label: <GradientText colors={['#65AB26', '#2CBD57']}>Zufrieden</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Glück} sind für heute gestiegen</>,
    },
    {
        name: "Glücklich",
        label: <GradientText colors={['#1AA319', '#2CBD57']}>Glücklich</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Glück} sind für heute gestiegen</>,
    },
    {
        name: "Energiegeladen",
        label: <GradientText colors={['#1AA319', '#65AB26']}>Energiegeladen</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Leben} sind für heute gestiegen</>,
    },
    {
        name: "Lebendig",
        label: <GradientText colors={['#65AB26', '#1AA319']}>Lebendig</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Leben} sind für heute gestiegen</>,
    },
    {
        name: "Euphorisch",
        label: <GradientText colors={['#A7E555', '#2CBD57']}>Euphorisch</GradientText>,
        bonus: <>Deine Anzahl der {SYSTEM.Runden} sind für heute gestiegen</>,
    },
    {
        name: "Entschlossen",
        label: <GradientText colors={['#65AB26', '#1AA319']}>Entschlossen</GradientText>,
        bonus: <>Deine Anzahl der {SYSTEM.Runden} sind für heute gestiegen</>,
    },
    {
        name: "Angrifslustig",
        label: <GradientText colors={['#A7E555', '#65AB26']}>Angrifslustig</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Angriff} sind für heute gestiegen</>,
    },
    {
        name: "Wütend",
        label: <GradientText colors={['#1AA319', '#A7E555']}>Wütend</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Angriff} sind für heute gestiegen</>,
    },
    {
        name: "Fröhlich",
        label: <GradientText colors={['#2CBD57', '#A7E555']}>Fröhlich</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Verteidigung} sind für heute gestiegen</>,
    },
    {
        name: "Misstrauisch",
        label: <GradientText colors={['#2CBD57', '#65AB26']}>Misstrauisch</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Verteidigung} sind für heute gestiegen</>,
    }
]

export const feelingMap: Record<string, Feeling> = feelings.reduce((map, feeling) => {
    map[feeling.name] = feeling;
    return map;
}, {} as Record<string, Feeling>);



type FeelingName = typeof feelings[number]['name'];
export const feelingsData: Record<FeelingName, { stats: Partial<PlayerStats> }> = {
    Normal: {
        stats: {}
    },
    Zufrieden: {
        stats: {
            luck: 5
        }
    },
    Glücklich: {
        stats: {
            luck: 5
        }
    },
    Energiegeladen: {
        stats: {
            life: 10,
            maxLife: 10,
        }
    },
    Lebendig: {
        stats: {
            life: 10,
            maxLife: 10,
        },
    },
    Euphorisch: {
        stats: {
            rounds: 2,
            maxRounds: 2,
        }
    },
    Entschlossen: {
        stats: {
            rounds: 2,
            maxRounds: 2,
        }
    },
    Angrifslustig: {
        stats: {
            attack: 5,
        }
    },
    Wütend: {
        stats: {
            attack: 5,
        }
    },
    Fröhlich: {
        stats: {
            defense: 5,
        }
    },
    Misstrauisch: {
        stats: {
            defense: 5,
        }
    },

    Unzufrieden: {
        stats: {
            luck: -5
        }
    },
    Hoffnungslos: {
        stats: {
            luck: -5
        }
    },
    Ausgelaugt: {
        stats: {
            life: -10,
            maxLife: -10,
        }
    },
    Melancholisch: {
        stats: {
            life: -10,
            maxLife: -10,
        },
    },
    Antriebslos: {
        stats: {
            rounds: -2,
            maxRounds: -2,
        }
    },
    Ängstlich: {
        stats: {
            rounds: -2,
            maxRounds: -2,
        }
    },
    Unsicher: {
        stats: {
            attack: -5,
        }
    },
    Skeptisch: {
        stats: {
            attack: -5,
        }
    },
    Leichtsinnig: {
        stats: {
            defense: -5,
        }
    },
    Erleichtert: {
        stats: {
            defense: -5,
        }
    }
}


export type RandomFeeling = {
    feeling: Feeling;
    data: Partial<PlayerStats>;
};

export function getRandomFeeling(): RandomFeeling {
    const randomIndex = Math.floor(Math.random() * feelings.length);
    const feeling = feelings[randomIndex] || emptyFeelingObj;
    const data = feelingsData[feeling.name as FeelingName].stats || {};

    return { feeling, data };
}

// const { feeling, data } = getRandomFeeling();
//
// console.log('Zufälliges Feeling:', feeling.name);
// console.log('Zugehörige Daten:', data.stats);