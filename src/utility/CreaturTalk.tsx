import { ReactNode } from "react";

type CreatureTalkProps = {
    name: string;
    children: ReactNode;
};

const creatureNames: Record<string, string> = {
    geflügeltesWesen: "#ff33ff",
    blauesWesen: "#3333ff",
    rotesWesen: "#ff3333",
};

const CreatureTalk: React.FC<CreatureTalkProps> = ({ name, children }) => {
    let color = creatureNames[name];

    if (!color) {
        console.error(`Unbekannter Creature-Name: ${name}`);
        color = "#eeeeee"
    }

    return (
        <span style={{ color }}>
            <i>{children}</i>
        </span>
    );
};

export default CreatureTalk;

