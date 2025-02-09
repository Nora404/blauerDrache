import { NpcActions, npcNames, NpcTopics, Topic } from "../../data/helper/randomNpcTalkingData";
import { GradientText } from "../Formatted/GradientText";

const getRandomElement = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
};

const RandomNpcTalking: React.FC = () => {
    const name1 = getRandomElement(npcNames);
    let name2 = getRandomElement(npcNames);

    // Sicherstellen, dass die Namen unterschiedlich sind
    while (name2 === name1) {
        name2 = getRandomElement(npcNames);
    }

    const action = getRandomElement(NpcActions);
    const topicObj: Topic = getRandomElement(NpcTopics);
    const { topic, dialogues } = topicObj;
    const dialogue = getRandomElement(dialogues);

    return (
        <span>
            {name1} {action} {name2} {topic}: <br />&#34;<GradientText colors={['#8CE0D5']}>{dialogue}</GradientText>&#34;
        </span>
    );
};

export default RandomNpcTalking