import React from 'react';
import Header from '../../../../layout/Header/Header';
import RandomNpcTalking from '../../../../utility/RandomNpcTalking';

type TradingDistrictProps = {
};

const TradingDistrict: React.FC<TradingDistrictProps> = () => {
    return (
        <div>
            <h2>Handelsbezirk</h2>
            <p className='mb-1 text-left'>

            </p><br />

            <Header>Echos der Gespräche</Header>

            <p className='mb-1 text-left'><RandomNpcTalking /></p>
            <p className='mb-1 text-left'><RandomNpcTalking /></p>
            <p className='mb-1 text-left'><RandomNpcTalking /></p>
            <p className='mb-1 text-left'><RandomNpcTalking /></p>
            <p className='mb-1 text-left'><RandomNpcTalking /></p>
        </div>
    );
};

export default TradingDistrict;