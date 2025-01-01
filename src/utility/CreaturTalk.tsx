import { ReactNode } from "react";

type CreatureTalkProps = {
    name?: keyof typeof creatureNames;
    color?: string;
    children: ReactNode;
};

const creatureNames: Record<string, string> = {
    geflügeltesWesen: "#ff33ff",
    blauesWesen: "#A3D8FF",
    rotesWesen: "#ff3333",
};

const CreatureTalk: React.FC<CreatureTalkProps> = ({ name, color, children }) => {
    const defaultColor = "#eeeeee";
    const textColor = name && creatureNames[name] ? creatureNames[name] : color || defaultColor;

    return (
        <span style={{ color: textColor }}>
            <i>{children}</i>
        </span>
    );
};

export default CreatureTalk;

