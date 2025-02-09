import React from "react";
import { PlacesKeys } from "../../../../data/helper/colorfullStrings";
import { useEditorContext } from "../../Context/EventContext";
import { getAllPlaces } from "../../Context/Helper";
import HeaderSmall from "../../../../layout/Header/HeaderSmall";

type Places = {};

const Places: React.FC<Places> = () => {
  // Places-Array
  const { places, setPlaces, addPlace, removePlace } = useEditorContext();

  return (
    <div className="max-widht" style={{ border: "1px dashed gray", padding: "15px", marginBottom: "25px" }}>
      <HeaderSmall>An welchen Orten kann das Event zufällig starten?</HeaderSmall><br />
      {places.map((pl, pIndex) => (
        <div key={pIndex} className="flex-row">
          Ort:
          <select
            className="w-100"
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
          Warscheinlichkeit:
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
