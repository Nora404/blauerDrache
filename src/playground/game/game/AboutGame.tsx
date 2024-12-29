import React from 'react';

type AboutGame = {
    title?: string;
    onClick?: () => void;
};

const AboutGame: React.FC<AboutGame> = () => {

    return (
        <div className="max-widht">
            <h2>Das erwartet dich hier ...</h2>

        </div>
    );
};

export default AboutGame;
