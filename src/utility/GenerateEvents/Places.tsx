import React, { useState } from "react";
import { PlacesKeys } from "../../data/colorfullStrings";

function getAllPlaces(): PlacesKeys[] {
    const all: PlacesKeys[] = [
        "Nordtor",
        "Westmauer",
        "Ostmauer",
        "Südmauer",
        "Brunnen",
        "Vorplatz",
        "Kirche",
        "Friedhof",
        "Rathaus",
        "Taverne",
        "Handelsbezirk",
        "Krämer",
        "Waffenladen",
        "Ausrüstungsladen",
        "Wohnbezirk",
        "Gassen",
        "Haus",
        "Weg",
        "Fluss",
        "Quelle",
        "See",
        "Sumpf",
        "Waldrand",
        "Wald",
        "Waldlichtung",
        "Dunkelwald",
        "Toilletenhaus",
        "Wiese",
        "Feld",
        "Steppe",
        "Ödland",
        "Hügelland",
        "Bergfuß",
        "Bergpfad",
        "Bergspitze",
        "Höhleneingang",
        "Höhle",
        "Schatzkammer",
    ];
    return all;
}

type Places = {
};

const Places: React.FC<Places> = () => {
    // Places-Array
    const [places, setPlaces] = useState<
        { place: PlacesKeys; probability: number }[]
    >([]);


    function addPlace() {
        const all = getAllPlaces();
        const defaultPlace = all[0] ?? "Nordtor";
        setPlaces((prev) => [...prev, { place: defaultPlace, probability: 100 }]);
    }
    function removePlace(index: number) {
        setPlaces((prev) => prev.filter((_, i) => i !== index));
    }

    return (
        <div className="max-widht">
            <h2>Orte</h2>
            {places.map((pl, pIndex) => (
                <div key={pIndex} className="single-place-row">
                    <select
                        className="w-50"
                        value={pl.place}
                        onChange={(e) => {
                            const val = e.target.value as PlacesKeys;
                            setPlaces((prev) =>
                                prev.map((pp, idx) =>
                                    idx === pIndex ? { ...pp, place: val } : pp
                                )
                            );
                        }}
                    >
                        {getAllPlaces().map((p) => (
                            <option key={p} value={p}>
                                {p}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={pl.probability}
                        onChange={(e) => {
                            const val = parseInt(e.target.value, 10) || 100;
                            setPlaces((prev) =>
                                prev.map((pp, idx) =>
                                    idx === pIndex ? { ...pp, probability: val } : pp
                                )
                            );
                        }}
                    // style={{ width: "4rem", marginLeft: "0.5rem" }}
                    />
                    <button
                        onClick={() => removePlace(pIndex)}
                        className="remove-button"
                        style={{ marginLeft: "0.5rem" }}
                    >
                        Entfernen
                    </button>
                </div>
            ))}
            <button onClick={addPlace} className="add-button">
                Ort hinzufügen
            </button>
        </div>
    );
};

export default Places;