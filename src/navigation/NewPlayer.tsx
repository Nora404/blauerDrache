import React from 'react';
import Header from '../layout/Header';

type NewPlayerProps = {

};

const NewPlayer: React.FC<NewPlayerProps> = () => {

    return (
        <div>
            <Header>Neu hier ?</Header>
            <p className='text-left'>
                Tor von Lahtheim<br /><br />
                Erstelle neuen Charakter<br />
                Was erwartet dich?<br />
            </p>
        </div>
    );
};

export default NewPlayer;