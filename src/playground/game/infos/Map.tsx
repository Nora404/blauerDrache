import React from 'react';
import karte from "../../../assets/karte5.png";
import lahtheim from "../../../assets/lahtheim.png";
import Header from '../../../layout/Header/Header';

const Map: React.FC = () => {

    return (
        <div className='max-width'>
            <h2>Karten</h2>

            <Header>Die Welt</Header>
            <img
                src={karte}
                style={{ width: '100%', marginTop: '10px' }}
                alt="Karte"
            /><br /><br />

            <Header>Lahtheim</Header>
            <img
                src={lahtheim}
                style={{ width: '100%', marginTop: '10px' }}
                alt="Karte"
            /><br /><br />

        </div>
    );
};

export default Map;