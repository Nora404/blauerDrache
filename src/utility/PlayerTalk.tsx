import React, { ReactNode } from 'react';
import { GradientText } from './GradientText';

type PlayerTalkProps = {
    children: ReactNode;
};

const PlayerTalk: React.FC<PlayerTalkProps> = ({ children }) => {

    return (
        <span style={{color:'#C7FAFF'}}><i>{children}</i></span>
    );
};

export default PlayerTalk;