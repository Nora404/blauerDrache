import React from 'react';
import Header from '../layout/Header';

type YouHaveProps = {
    gold?: number;
    edelsteine?: number;
    weapon?: string;
    armor?: string;
    items?: number;
};

const YouHave: React.FC<YouHaveProps> = (
    { gold = 100, edelsteine = 0, weapon = 'nothing', armor = 'nothing', items = 0 }
) => {

    return (
        <div>
            <Header>Das hast du</Header>
            <p className='text-left padding-left'>
                Gold: {gold}<br />
                Edelsteine: {edelsteine}<br />
                Waffe: {weapon}<br />
                Rüstung: {armor}<br />
                Inventar: {items}<br />
            </p>
        </div>
    );
};

export default YouHave;