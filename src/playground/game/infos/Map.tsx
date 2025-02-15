import React from 'react';
import karte3 from "../../../assets/karte3.png";
import Header from '../../../layout/Header/Header';

import img01 from '../../../assets/img/lahtheim.webp';
import img02 from '../../../assets/img/path.webp';
import img03 from '../../../assets/img/field.webp';

import img04 from '../../../assets/img/see.webp';
import img05 from '../../../assets/img/river.webp';
import img06 from '../../../assets/img/elf.webp';
import img07 from '../../../assets/img/marsh.webp';
import img08 from '../../../assets/img/ork.webp';
import img09 from '../../../assets/img/ruin.webp';




const Map: React.FC = () => {

    return (
        <div className='max-width'>
            <h2>Karte von Lahtheim</h2>

            <img
                src={karte3}
                style={{ width: '100%', maxWidth: '800px' }}
                alt="Karte"
            />

            <Header>Lahtheim und Umland</Header>
            <div>
                <div className='flex-row mb-2'>
                    <img src={img01} alt="Lahtheim" style={{ width: "150px" }} />
                    <div className='text-left flex-top padding-x'>
                        <b>Lahtheim</b>
                        <p>
                            Die Hauptstadt Lahtheim ist ein Ort des Handels und der Kultur. Hier leben die meisten Menschen und es gibt viele Geschäfte und Tavernen.
                        </p>
                    </div>
                </div>
                <div className='flex-row mb-2'>
                    <img src={img02} alt="Lahtheim" style={{ width: "150px" }} />
                    <div className='text-left flex-top padding-x'>
                        <b>Weg</b>
                        <p>
                            Die Hauptstadt Lahtheim ist ein Ort des Handels und der Kultur. Hier leben die meisten Menschen und es gibt viele Geschäfte und Tavernen.
                        </p>
                    </div>
                </div>
                <div className='flex-row mb-2'>
                    <img src={img03} alt="Lahtheim" style={{ width: "150px" }} />
                    <div className='text-left flex-top padding-x'>
                        <b>Felder</b>
                        <p>
                            Die Hauptstadt Lahtheim ist ein Ort des Handels und der Kultur. Hier leben die meisten Menschen und es gibt viele Geschäfte und Tavernen.
                        </p>
                    </div>
                </div>
            </div>

            <Header>Am Fluss Drachenblut</Header>
            <div>
                <div className='flex-row mb-2'>
                    <img src={img04} alt="Lahtheim" style={{ width: "150px" }} />
                    <div className='text-left flex-top padding-x'>
                        <b>See</b>
                        <p>
                            Die Hauptstadt Lahtheim ist ein Ort des Handels und der Kultur. Hier leben die meisten Menschen und es gibt viele Geschäfte und Tavernen.
                        </p>
                    </div>
                </div>
                <div className='flex-row mb-2'>
                    <img src={img05} alt="Lahtheim" style={{ width: "150px" }} />
                    <div className='text-left flex-top padding-x'>
                        <b>Drachenblut</b>
                        <p>
                            Die Hauptstadt Lahtheim ist ein Ort des Handels und der Kultur. Hier leben die meisten Menschen und es gibt viele Geschäfte und Tavernen.
                        </p>
                    </div>
                </div>
                <div className='flex-row mb-2'>
                    <img src={img06} alt="Lahtheim" style={{ width: "150px" }} />
                    <div className='text-left flex-top padding-x'>
                        <b>Pa'ras</b>
                        <p>
                            Die Hauptstadt Lahtheim ist ein Ort des Handels und der Kultur. Hier leben die meisten Menschen und es gibt viele Geschäfte und Tavernen.
                        </p>
                    </div></div>
                <div className='flex-row mb-2'>
                    <img src={img07} alt="Lahtheim" style={{ width: "150px" }} />
                    <div className='text-left flex-top padding-x'>
                        <b>Düsterbruch</b>
                        <p>
                            Die Hauptstadt Lahtheim ist ein Ort des Handels und der Kultur. Hier leben die meisten Menschen und es gibt viele Geschäfte und Tavernen.
                        </p>
                    </div></div>
                <div className='flex-row mb-2'>
                    <img src={img08} alt="Lahtheim" style={{ width: "150px" }} />
                    <div className='text-left flex-top padding-x'>
                        <b>Naruz</b>
                        <p>
                            Die Hauptstadt Lahtheim ist ein Ort des Handels und der Kultur. Hier leben die meisten Menschen und es gibt viele Geschäfte und Tavernen.
                        </p>
                    </div></div>
                <div className='flex-row mb-2'>
                    <img src={img09} alt="Lahtheim" style={{ width: "150px" }} />
                    <div className='text-left flex-top padding-x'>
                        <b>Verfallene Ruine</b>
                        <p>
                            Die Hauptstadt Lahtheim ist ein Ort des Handels und der Kultur. Hier leben die meisten Menschen und es gibt viele Geschäfte und Tavernen.
                        </p>
                    </div>
                </div>
            </div>

            <Header>Die Geisterwälder</Header>
            <div></div>

            <Header>Im Osten</Header>
            <div></div>

            <Header>Gebirgskette Leerenwall</Header>
            <div></div>

            <Header>Alles und Nichts</Header>
            <div></div>

        </div>
    );
};

export default Map;