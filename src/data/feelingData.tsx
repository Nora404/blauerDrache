import { PlayerStats } from "../store/newGameStore";
import { GradientText } from "../utility/GradientText";
import { SYSTEM } from "./colorfullStrings";

export type Feeling = {
    name: string,
    label: JSX.Element;
    bonus: JSX.Element;
    stats: Partial<PlayerStats>
}

export type FeelingName = typeof feelings[number]['name'];

export const emptyFeelingObj: Feeling = {
    name: "Normal",
    label: <GradientText colors={['#eeeeee', '#dddddd']}>Normal</GradientText>,
    bonus: <>Stimmung beeinflusst deine Werte nicht</>,
    stats: {}
}

export const feelings: Feeling[] = [
    {
        name: "Normal",
        label: <GradientText colors={['#eeeeee', '#dddddd']}>Normal</GradientText>,
        bonus: <>Stimmung beeinflusst deine Werte nicht</>,
        stats: {}
    },

    {
        name: "Unzufrieden",
        label: <GradientText colors={['#FF725B', '#D46A30']}>Unzufrieden</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Glück} sind für heute gesunken</>,
        stats: {
            luck: -5
        }
    },
    {
        name: "Hoffnungslos",
        label: <GradientText colors={['#FFA53B', '#D42416']}>Hoffnungslos</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Glück} sind für heute gesunken</>,
        stats: {
            luck: -5
        }
    },
    {
        name: "Ausgelaugt",
        label: <GradientText colors={['#D42416', '#FF725B']}>Ausgelaugt</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Leben} sind für heute gesunken</>,
        stats: {
            life: -10,
        }
    },
    {
        name: "Melancholisch",
        label: <GradientText colors={['#FF725B', '#FFA53B']}>Melancholisch</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Leben} sind für heute gesunken</>,
        stats: {
            life: -10,
        },
    },
    {
        name: "Antriebslos",
        label: <GradientText colors={['#FFA53B', '#D42416']}>Antriebslos</GradientText>,
        bonus: <>Deine Anzahl der {SYSTEM.Runden} sind für heute gesunken</>,
        stats: {
            rounds: -2,
        }
    },
    {
        name: "Ängstlich",
        label: <GradientText colors={['#D46A30', '#FF725B']}>Ängstlich</GradientText>,
        bonus: <>Deine Anzahl der {SYSTEM.Runden} sind für heute gesunken</>,
        stats: {
            rounds: -2,
        }
    },
    {
        name: "Unsicher",
        label: <GradientText colors={['#FF725B', '#D46A30']}>Unsicher</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Angriff} sind für heute gesunken</>,
        stats: {
            attack: -5,
        }
    },
    {
        name: "Skeptisch",
        label: <GradientText colors={['#D42416', '#D46A30']}>Skeptisch</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Angriff} sind für heute gesunken</>,
        stats: {
            attack: -5,
        }
    },
    {
        name: "Leichtsinnig",
        label: <GradientText colors={['#D46A30', '#FFA53B']}>Leichtsinnig</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Verteidigung} sind für heute gesunken</>,
        stats: {
            defense: -5,
        }
    },
    {
        name: "Erleichtert",
        label: <GradientText colors={['#D46A30', '#FF725B']}>Erleichtert</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Verteidigung} sind für heute gesunken</>,
        stats: {
            defense: -5,
        }
    },


    {
        name: "Zufrieden",
        label: <GradientText colors={['#65AB26', '#2CBD57']}>Zufrieden</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Glück} sind für heute gestiegen</>,
        stats: {
            luck: 5
        }
    },
    {
        name: "Glücklich",
        label: <GradientText colors={['#1AA319', '#2CBD57']}>Glücklich</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Glück} sind für heute gestiegen</>,
        stats: {
            luck: 5
        }
    },
    {
        name: "Energiegeladen",
        label: <GradientText colors={['#1AA319', '#65AB26']}>Energiegeladen</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Leben} sind für heute gestiegen</>,
        stats: {
            life: 10,
        }
    },
    {
        name: "Lebendig",
        label: <GradientText colors={['#65AB26', '#1AA319']}>Lebendig</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Leben} sind für heute gestiegen</>,
        stats: {
            life: 10,
        },
    },
    {
        name: "Euphorisch",
        label: <GradientText colors={['#A7E555', '#2CBD57']}>Euphorisch</GradientText>,
        bonus: <>Deine Anzahl der {SYSTEM.Runden} sind für heute gestiegen</>,
        stats: {
            rounds: 2,
        }
    },
    {
        name: "Entschlossen",
        label: <GradientText colors={['#65AB26', '#1AA319']}>Entschlossen</GradientText>,
        bonus: <>Deine Anzahl der {SYSTEM.Runden} sind für heute gestiegen</>,
        stats: {
            rounds: 2,
        }
    },
    {
        name: "Angrifslustig",
        label: <GradientText colors={['#A7E555', '#65AB26']}>Angrifslustig</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Angriff} sind für heute gestiegen</>,
        stats: {
            attack: 5,
        }
    },
    {
        name: "Wütend",
        label: <GradientText colors={['#1AA319', '#A7E555']}>Wütend</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Angriff} sind für heute gestiegen</>,
        stats: {
            attack: 5,
        }
    },
    {
        name: "Fröhlich",
        label: <GradientText colors={['#2CBD57', '#A7E555']}>Fröhlich</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Verteidigung} sind für heute gestiegen</>,
        stats: {
            defense: 5,
        }
    },
    {
        name: "Misstrauisch",
        label: <GradientText colors={['#2CBD57', '#65AB26']}>Misstrauisch</GradientText>,
        bonus: <>Deine Werte für {SYSTEM.Verteidigung} sind für heute gestiegen</>,
        stats: {
            defense: 5,
        }
    }
]

export const feelingMap: Record<string, Feeling> = feelings.reduce((map, feeling) => {
    map[feeling.name] = feeling;
    return map;
}, {} as Record<string, Feeling>);

export function getRandomFeeling(): Feeling {
    const randomIndex = Math.floor(Math.random() * feelings.length);
    const feeling = feelings[randomIndex] || emptyFeelingObj;
    return feeling;
}