import "../../../../styles/image.css";

import img01 from '../../../../assets/img/lahtheim.webp';
import img02 from '../../../../assets/img/path.webp';
import img03 from '../../../../assets/img/field.webp';

import img04 from '../../../../assets/img/see.webp';
import img05 from '../../../../assets/img/river.webp';
import img06 from '../../../../assets/img/elf.webp';
import img07 from '../../../../assets/img/marsh.webp';
import img08 from '../../../../assets/img/ork.webp';
import img09 from '../../../../assets/img/ruin.webp';

import img10 from '../../../../assets/img/edge.webp';
import img11 from '../../../../assets/img/forest.webp';
import img12 from '../../../../assets/img/sylvan.webp';
import img13 from '../../../../assets/img/deepForest.webp';
import img14 from '../../../../assets/img/fenril.webp';

import img15 from '../../../../assets/img/meadow.webp';
import img16 from '../../../../assets/img/steppe.webp';
import img17 from '../../../../assets/img/badlands.webp';
import img18 from '../../../../assets/img/echsen.webp';

import img19 from '../../../../assets/img/mountainFoot.webp';
import img20 from '../../../../assets/img/mountainPath.webp';
import img21 from '../../../../assets/img/mountanPick.webp';
import img22 from '../../../../assets/img/felkin.webp';
import img23 from '../../../../assets/img/zwerk.webp';

import img24 from '../../../../assets/img/darkLand.webp';

interface ImageItem {
    src: string;
    caption: string;
}

const images: ImageItem[] = [
    { src: img01, caption: "Lahtheim" },
    { src: img02, caption: "Umgebung" },
    { src: img03, caption: "Felder" },
    { src: img04, caption: "See" },
    { src: img05, caption: "Drachenblut" },
    { src: img06, caption: "Pa'ras" },
    { src: img07, caption: "Düsterbruch" },
    { src: img08, caption: "Naruz" },
    { src: img09, caption: "Ruinen" },
    { src: img10, caption: "Waldrand" },
    { src: img11, caption: "Geisterwald" },
    { src: img12, caption: "Faylotia" },
    { src: img13, caption: "Tiefwald" },
    { src: img14, caption: "Tekron" },
    { src: img15, caption: "Wiesen" },
    { src: img16, caption: "Steppe" },
    { src: img17, caption: "land aus Sand" },
    { src: img18, caption: "Lager" },
    { src: img19, caption: "Bergfuß" },
    { src: img20, caption: "Leerenwall" },
    { src: img21, caption: "Himmelsspitze" },
    { src: img22, caption: "Perlen" },
    { src: img23, caption: "Konyur" },
    { src: img24, caption: "Alles und Nichts" },
];

const Book7: React.FC = () => {

    return <div className="text-left">
        <p className="mb-2">
            Diese Bilder wurden von einer KI erstellt. Da ich alleine an diesem Spiel arbeite, habe ich nicht die Zeit, um alle Bilder selbst zu malen. Ich hoffe, dass die KI-Bilder trotzdem gefallen. Sie sollen helfen sich die Welt besser vorstellen zu können. Besser noch wenn du sie nicht brauchst und eigene Bilder im Kopf hast :-)
        </p>

        <div className="gallery-container">
            {images.map((item, index) => (
                <div key={index} className="gallery-item">
                    <img src={item.src} alt={item.caption} />
                    <div className="gallery-caption">{item.caption}</div>
                </div>
            ))}
        </div>
    </div>;
};

export default Book7;
