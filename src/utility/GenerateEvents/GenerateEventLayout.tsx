// EventCreationFormLayout.tsx
import React, { useState } from "react";

// Typdefinitionen für Dummy-Daten
type Button = {
  id: number;
  label: string;
  // Weitere Felder können hier hinzugefügt werden
};

type Place = {
  id: number;
  place: string;
  probability: number;
};

const EventCreationFormLayout: React.FC = () => {
  // State-Management
  const [buttons, setButtons] = useState<Button[]>([
    { id: 1, label: "Start Button" },
  ]);
  const [places, setPlaces] = useState<Place[]>([
    { id: 1, place: "Nordtor", probability: 50 },
  ]);
  const [output, setOutput] = useState<string>(
    "Hier wird der generierte Code angezeigt..."
  );
  const [copySuccess, setCopySuccess] = useState<string>("");

  // Handler zum Hinzufügen eines neuen Buttons
  const addButton = () => {
    const newId = buttons.length > 0 ? buttons[buttons.length - 1].id + 1 : 1;
    setButtons([...buttons, { id: newId, label: `Button ${newId}` }]);
  };

  // Handler zum Entfernen eines Buttons
  const removeButton = (id: number) => {
    setButtons(buttons.filter((btn) => btn.id !== id));
  };

  // Handler zum Hinzufügen eines neuen Places
  const addPlace = () => {
    const newId = places.length > 0 ? places[places.length - 1].id + 1 : 1;
    setPlaces([...places, { id: newId, place: "Neuer Ort", probability: 10 }]);
  };

  // Handler zum Entfernen eines Places
  const removePlace = (id: number) => {
    setPlaces(places.filter((place) => place.id !== id));
  };

  // Handler zum Kopieren des generierten Codes in die Zwischenablage
  const copyToClipboard = () => {
    navigator.clipboard.writeText(output).then(
      () => {
        setCopySuccess("Code wurde erfolgreich in die Zwischenablage kopiert!");
        setTimeout(() => setCopySuccess(""), 2000);
      },
      (err) => {
        setCopySuccess("Fehler beim Kopieren!");
        console.error("Fehler beim Kopieren: ", err);
        setTimeout(() => setCopySuccess(""), 2000);
      }
    );
  };

  // Dummy-Funktion zum Generieren von Code
  const generateCode = () => {
    const dummyCode = `
export const gameEvent = {
  id: "event001",
  label: "Start Event",
  buttons: ${JSON.stringify(buttons, null, 2)},
  places: ${JSON.stringify(places, null, 2)},
};
    `;
    setOutput(dummyCode);
  };

  // Funktion zum Generieren der Places Optionen (Dummy-Daten)
  const getPlacesOptions = (): string[] => {
    return [
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
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Event-Erstellungsformular</h1>
      <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
        {/* GameEvent Section */}
        <div style={styles.formSection}>
          <h2>GameEvent</h2>
          {/* Event ID */}
          <div style={styles.formGroup}>
            <label htmlFor="eventId" style={styles.label}>
              ID<span style={{ color: "red" }}>*</span>:
            </label>
            <input
              type="text"
              id="eventId"
              name="eventId"
              style={styles.input}
              value="event001" // Dummy-Daten
              disabled
            />
          </div>
          {/* Label */}
          <div style={styles.formGroup}>
            <label htmlFor="label" style={styles.label}>
              Label<span style={{ color: "red" }}>*</span>:
            </label>
            <input
              type="text"
              id="label"
              name="label"
              style={styles.input}
              value="Start Event" // Dummy-Daten
              disabled
            />
          </div>
          {/* Beschreibung */}
          <div style={styles.formGroup}>
            <label htmlFor="description" style={styles.label}>
              Beschreibung:
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Beschreibung hier eingeben"
              style={styles.textarea}
              value="Dies ist ein Start-Event."
              disabled
            ></textarea>
          </div>

          {/* Buttons Section */}
          <div style={styles.formSection}>
            <div style={styles.sectionHeader}>
              <h3>Buttons</h3>
              <button
                type="button"
                style={styles.addButton}
                onClick={addButton}
              >
                Button hinzufügen
              </button>
            </div>
            <div>
              {buttons.map((btn) => (
                <div key={btn.id} style={styles.nestedSection}>
                  {/* Button Label */}
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      Button Label<span style={{ color: "red" }}>*</span>:
                    </label>
                    <input
                      type="text"
                      name={`buttons-${btn.id}-label`}
                      style={styles.input}
                      value={btn.label}
                      disabled
                    />
                  </div>

                  {/* Weitere Felder können hier hinzugefügt werden */}

                  {/* Entfernen Button */}
                  <button
                    type="button"
                    style={styles.removeButton}
                    onClick={() => removeButton(btn.id)}
                  >
                    Entfernen
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Places Section */}
          <div style={styles.formSection}>
            <div style={styles.sectionHeader}>
              <h3>Orte</h3>
              <button type="button" style={styles.addButton} onClick={addPlace}>
                Ort hinzufügen
              </button>
            </div>
            <div>
              {places.map((place) => (
                <div key={place.id} style={styles.nestedSection}>
                  {/* Ort Auswahl */}
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Ort:</label>
                    <select
                      name={`places-${place.id}-place`}
                      style={styles.input}
                      value={place.place}
                      disabled
                    >
                      <option value="">--Wähle einen Ort--</option>
                      {getPlacesOptions().map((placeOption) => (
                        <option key={placeOption} value={placeOption}>
                          {placeOption}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Wahrscheinlichkeit */}
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Wahrscheinlichkeit (%):</label>
                    <input
                      type="number"
                      name={`places-${place.id}-probability`}
                      min={1}
                      max={100}
                      placeholder="1-100"
                      style={styles.input}
                      value={place.probability}
                      disabled
                    />
                  </div>
                  {/* Entfernen Button */}
                  <button
                    type="button"
                    style={styles.removeButton}
                    onClick={() => removePlace(place.id)}
                  >
                    Entfernen
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Code Button */}
        <button
          type="button"
          style={styles.generateButton}
          onClick={generateCode}
        >
          Code Generieren
        </button>
      </form>

      {/* Output Section */}
      <div style={styles.outputContainer}>
        <h2>Generierter Code</h2>
        <pre style={styles.output}>{output}</pre>
        <button
          type="button"
          style={styles.copyButton}
          onClick={copyToClipboard}
        >
          In Zwischenablage kopieren
        </button>
        {copySuccess && <div style={styles.copyMessage}>{copySuccess}</div>}
      </div>
    </div>
  );
};

// Inline-Stile
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "20px",
    backgroundColor: "#f4f4f4",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  form: {
    background: "#fff",
    padding: "20px",
    borderRadius: "5px",
    maxWidth: "1200px",
    margin: "auto",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  formSection: {
    marginBottom: "20px",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addButton: {
    background: "#28a745",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  removeButton: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
  nestedSection: {
    marginLeft: "20px",
    paddingLeft: "20px",
    borderLeft: "2px solid #eee",
    marginBottom: "20px",
  },
  formGroup: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "15px",
    alignItems: "center",
  },
  label: {
    width: "200px",
    paddingRight: "10px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  textarea: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  generateButton: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    display: "block",
    margin: "20px auto 0",
  },
  outputContainer: {
    background: "#fff",
    padding: "20px",
    borderRadius: "5px",
    maxWidth: "1200px",
    margin: "20px auto",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  output: {
    background: "#272822",
    color: "#f8f8f2",
    padding: "20px",
    borderRadius: "5px",
    whiteSpace: "pre-wrap",
    fontFamily: "Consolas, monospace",
    maxHeight: "400px",
    overflowY: "auto",
  },
  copyButton: {
    background: "#17a2b8",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "14px",
  },
  copyMessage: {
    marginTop: "10px",
    color: "green",
    fontWeight: "bold",
  },
};

export default EventCreationFormLayout;
