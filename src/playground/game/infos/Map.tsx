import React from 'react';
import karte from "../../../assets/karte4.png";

const Map: React.FC = () => {

    return (
        <div className='max-width'>
            <h2>Karte von Lahtheim</h2>

            <img
                src={karte}
                style={{ width: '100%' }}
                alt="Karte"
            /><br /><br />

        </div>
    );
};

export default Map;