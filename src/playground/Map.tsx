import React from 'react';
import karte from "../assets/karte.png";

type MapProps = {

};

const Map: React.FC<MapProps> = () => {

    return (
        <div>
            <img src={karte} width={900} />
        </div>
    );
};

export default Map;