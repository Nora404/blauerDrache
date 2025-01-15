import React from "react";
import { PlacesKeys } from "../../../data/colorfullStrings";
import { useEditorContext } from "../Context/Context";
import { getAllPlaces } from "../Context/Helper";

type Places = {};

const Places: React.FC<Places> = () => {
  // Places-Array
  const { places, setPlaces, addPlace, removePlace } = useEditorContext();

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
