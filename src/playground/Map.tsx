import React from 'react';
import karte from "../assets/karte.png";

type MapProps = {

};

const Map: React.FC<MapProps> = () => {

    return (
        <div>
            <img
                src={karte}
                style={{ width: '100%', maxWidth: '900px' }}
                alt="Karte"
            />
        </div>
    );
};

export default Map;