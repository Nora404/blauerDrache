import { NpcActions, npcNames, NpcTopics, Topic } from "../data/randomNpcTalkingData";
import { GradientText } from "./GradientText";

const getRandomElement = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
};


type RandomNpcTalkingProps = {
};


const RandomNpcTalking: React.FC<RandomNpcTalkingProps> = () => {
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
            {name1} {action} {name2} {topic}: &#34;<GradientText colors={['#8CE0D5']}>{dialogue}</GradientText>&#34;
        </span>
    );
};

export default RandomNpcTalking