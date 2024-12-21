import React from 'react';
import Header from '../layout/Header';

type YouHaveProps = {
    gold?: number;
    weapon?: string;
    armor?: string;
};

const YouHave: React.FC<YouHaveProps> = (
    { gold = 100, weapon = 'nothing', armor = 'nothing' }
) => {

    return (
        <div>
            <Header>Das hast du</Header>
            <p className='text-left'>
                Gold: {gold}<br />
                Waffe: {weapon}<br />
                Rüstung: {armor}<br />
            </p>
        </div>
    );
};

export default YouHave;