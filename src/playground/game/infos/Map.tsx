import React from 'react';
import karte from "../../../assets/karte5.png";
import lahtheim from "../../../assets/lahtheim.png";
import fayloria from "../../../assets/fayloria.png";
import tekron from "../../../assets/tekron.png";
import paras from "../../../assets/paras.png";
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
                className='mb-2'
            /><br /><br />


            <Header>Die Städte</Header>
            <div className='flex-warp-left' style={{ textAlign: 'left' }}>
                <ul>
                    <li className="boundaries">Grenzen und Übergänge</li>
                    <li className="administration">Verwaltung und Öffentliches</li>
                    <li className="paths">Wege und Plätze</li>
                </ul><ul>
                    <li className="crafting">Handwerk und Herstellung</li>
                    <li className="resurrection">Wiederbelebung</li>
                    <li className="homebase">Eigene Basis</li>
                </ul><ul>
                    <li className="commerce">Handel und Tausch</li>
                    <li className="darkzones">Dunkle Zonen</li>
                    <li>
                        <span className="waterways">Wasser</span> und <span className="nature">Natur</span>
                    </li>
                </ul>
            </div>

            <img
                src={lahtheim}
                style={{ width: '100%', marginTop: '30px' }}
                alt="Karte"
            /><br /><br />


            <img
                src={fayloria}
                style={{ width: '100%', marginTop: '30px' }}
                alt="Karte"
            /><br /><br />


            <img
                src={tekron}
                style={{ width: '100%', marginTop: '30px' }}
                alt="Karte"
            /><br /><br />


            <img
                src={paras}
                style={{ width: '100%', marginTop: '30px' }}
                alt="Karte"
            /><br /><br />

        </div>
    );
};

export default Map;