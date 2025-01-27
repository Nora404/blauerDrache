import React from 'react';
import karte2 from "../../../assets/karte.png";

const Map: React.FC = () => {

    return (
        <div className='mb-2'>
            <h2>Karte von Lahtheim</h2>
            {/* <img
                src={karte}
                style={{ width: '100%', maxWidth: '900px' }}
                alt="Karte"
            /> */}

            <img
                src={karte2}
                style={{ width: '100%', maxWidth: '900px' }}
                alt="Karte"
            />
        </div>
    );
};

export default Map;