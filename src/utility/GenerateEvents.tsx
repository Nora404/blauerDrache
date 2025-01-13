import React from "react";

type GenerateEventsProps = {};

const itemCategories: { [key: string]: string[] } = {
  Ressourcen: ['Stein', 'Stock', 'Pilz', 'Plunder', 'Kupfererz', 'Lederstück'],
  Verbrauchsmaterialien: ['Wasserflasche', 'Leere Flasche', 'Blume'],
  Sonstiges: ['Nichts', 'Blume'], // Weitere Kategorien und Items nach Bedarf hinzufügen
};
type ItemsDeltaEntry = {
  category: string;
  item: string;
  quantity: number;
};
type NextEvent = {
  eventId: string;
  probability: number;
};
type GetAction = {
  itemsDelta?: { [key: string]: number };
  economyDelta?: {
    gold?: number;
    edelsteine?: number;
  };
  fluxDelta?: {
    feeling?: string;
    item?: string;
    buff?: { [key: string]: number };
    debuff?: { [key: string]: number };
  };
  stateDelta?: {
    life?: number;
    rounds?: number;
    attack?: number;
    defense?: number;
    luck?: number;
  };
  baseDelta?: {
    exp?: number;
    reputation?: number;
  };
  triggerQuest?: string;
  endQuest?: string;
  nextEvents?: NextEvent[];
  message?: string;
};
type Button = {
  id: number;
  label: string;
  getAction: GetAction;
  triggerGroup: string;
  message: string;
};
type Place = {
  id: number;
  place: string;
  probability: number;
};

const GenerateEvents: React.FC<GenerateEventsProps> = () => {

  // State-Management
  const [eventId, setEventId] = useState<string>('');
  const [label, setLabel] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [buttons, setButtons] = useState<Button[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<string>('');

  // Styles
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      fontFamily: 'Arial, sans-serif',
      margin: '20px',
      backgroundColor: '#f4f4f4',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
    },
    form: {
      background: '#fff',
      padding: '20px',
      borderRadius: '5px',
      maxWidth: '1200px',
      margin: 'auto',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    formSection: {
      marginBottom: '20px',
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sectionHeaderButton: {
      background: '#28a745',
      color: '#fff',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    nestedSection: {
      marginLeft: '20px',
      paddingLeft: '20px',
      borderLeft: '2px solid #eee',
      marginBottom: '20px',
    },
    formGroup: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: '15px',
      alignItems: 'center',
    },
    label: {
      width: '200px',
      paddingRight: '10px',
      fontWeight: 'bold',
      color: '#333',
    },
    input: {
      flex: 1,
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    textarea: {
      flex: 1,
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    addButton: {
      background: '#28a745',
      color: '#fff',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    removeButton: {
      background: '#dc3545',
      color: '#fff',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginLeft: '10px',
    },
    generateButton: {
      background: '#007bff',
      color: '#fff',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      display: 'block',
      margin: '20px auto 0',
    },
    outputContainer: {
      background: '#fff',
      padding: '20px',
      borderRadius: '5px',
      maxWidth: '1200px',
      margin: '20px auto',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    output: {
      background: '#272822',
      color: '#f8f8f2',
      padding: '20px',
      borderRadius: '5px',
      whiteSpace: 'pre-wrap',
      fontFamily: 'Consolas, monospace',
      maxHeight: '400px',
      overflowY: 'auto',
    },
    copyButton: {
      background: '#17a2b8',
      color: '#fff',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
      fontSize: '14px',
    },
    checkboxGroup: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '200px',
    },
    radioGroup: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '200px',
    },
    messageSection: {
      marginLeft: '200px',
    },
    descriptionSection: {
      marginLeft: '200px',
    },
    nextEventsContainer: {
      marginLeft: '200px',
    },
    nextEvent: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
    },
    addNextEventButton: {
      background: '#28a745',
      border: 'none',
      color: '#fff',
      padding: '5px 10px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    itemsDeltaEntry: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: '5px',
    },
  };

  // Handler zum Hinzufügen eines neuen Buttons
  const handleAddButton = () => {
    setButtons((prevButtons) => [
      ...prevButtons,
      {
        id: Date.now(),
        label: '',
        getAction: {},
        triggerGroup: '',
        message: '',
      },
    ]);
  };

  // Handler zum Entfernen eines Buttons
  const handleRemoveButton = (id: number) => {
    setButtons((prevButtons) => prevButtons.filter((btn) => btn.id !== id));
  };

  // Handler zum Hinzufügen eines neuen Places
  const handleAddPlace = () => {
    setPlaces((prevPlaces) => [
      ...prevPlaces,
      {
        id: Date.now(),
        place: '',
        probability: 0,
      },
    ]);
  };

  // Handler zum Entfernen eines Places
  const handleRemovePlace = (id: number) => {
    setPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== id));
  };

  // Handler zum Aktualisieren eines Buttons
  const handleButtonChange = (
    id: number,
    field: keyof Button,
    value: any
  ) => {
    setButtons((prevButtons) =>
      prevButtons.map((btn) =>
        btn.id === id ? { ...btn, [field]: value } : btn
      )
    );
  };

  // Handler zum Aktualisieren der GetAction eines Buttons
  const handleGetActionChange = (
    buttonId: number,
    field: keyof GetAction,
    value: any
  ) => {
    setButtons((prevButtons) =>
      prevButtons.map((btn) =>
        btn.id === buttonId
          ? {
              ...btn,
              getAction: {
                ...btn.getAction,
                [field]: value,
              },
            }
          : btn
      )
    );
  };

  // Handler zum Hinzufügen eines itemsDelta Eintrags
  const handleAddItemsDelta = (buttonId: number) => {
    setButtons((prevButtons) =>
      prevButtons.map((btn) =>
        btn.id === buttonId
          ? {
              ...btn,
              getAction: {
                ...btn.getAction,
                itemsDelta: {
                  ...btn.getAction.itemsDelta,
                  [Date.now()]: { category: '', item: '', quantity: 0 },
                },
              },
            }
          : btn
      )
    );
  };

  // Handler zum Entfernen eines itemsDelta Eintrags
  const handleRemoveItemsDelta = (buttonId: number, key: number) => {
    setButtons((prevButtons) =>
      prevButtons.map((btn) => {
        if (btn.id === buttonId && btn.getAction.itemsDelta) {
          const updatedItemsDelta = { ...btn.getAction.itemsDelta };
          delete updatedItemsDelta[key];
          return {
            ...btn,
            getAction: {
              ...btn.getAction,
              itemsDelta: updatedItemsDelta,
            },
          };
        }
        return btn;
      })
    );
  };

  // Handler zum Aktualisieren eines itemsDelta Eintrags
  const handleItemsDeltaChange = (
    buttonId: number,
    key: number,
    field: keyof ItemsDeltaEntry,
    value: any
  ) => {
    setButtons((prevButtons) =>
      prevButtons.map((btn) => {
        if (btn.id === buttonId && btn.getAction.itemsDelta && btn.getAction.itemsDelta[key]) {
          return {
            ...btn,
            getAction: {
              ...btn.getAction,
              itemsDelta: {
                ...btn.getAction.itemsDelta,
                [key]: {
                  ...btn.getAction.itemsDelta[key],
                  [field]: value,
                },
              },
            },
          };
        }
        return btn;
      })
    );
  };

  // Handler zum Hinzufügen eines NextEvent Eintrags
  const handleAddNextEvent = (buttonId: number) => {
    setButtons((prevButtons) =>
      prevButtons.map((btn) =>
        btn.id === buttonId
          ? {
              ...btn,
              getAction: {
                ...btn.getAction,
                nextEvents: [
                  ...(btn.getAction.nextEvents || []),
                  { eventId: '', probability: 0 },
                ],
              },
            }
          : btn
      )
    );
  };

  // Handler zum Entfernen eines NextEvent Eintrags
  const handleRemoveNextEvent = (buttonId: number, index: number) => {
    setButtons((prevButtons) =>
      prevButtons.map((btn) => {
        if (btn.id === buttonId && btn.getAction.nextEvents) {
          const updatedNextEvents = [...btn.getAction.nextEvents];
          updatedNextEvents.splice(index, 1);
          return {
            ...btn,
            getAction: {
              ...btn.getAction,
              nextEvents: updatedNextEvents,
            },
          };
        }
        return btn;
      })
    );
  };

  // Handler zum Aktualisieren eines NextEvent Eintrags
  const handleNextEventChange = (
    buttonId: number,
    index: number,
    field: keyof NextEvent,
    value: any
  ) => {
    setButtons((prevButtons) =>
      prevButtons.map((btn) => {
        if (btn.id === buttonId && btn.getAction.nextEvents && btn.getAction.nextEvents[index]) {
          const updatedNextEvents = [...btn.getAction.nextEvents];
          updatedNextEvents[index] = {
            ...updatedNextEvents[index],
            [field]: value,
          };
          return {
            ...btn,
            getAction: {
              ...btn.getAction,
              nextEvents: updatedNextEvents,
            },
          };
        }
        return btn;
      })
    );
  };

  // Handler zum Aktualisieren eines Places
  const handlePlaceChange = (
    id: number,
    field: keyof Place,
    value: any
  ) => {
    setPlaces((prevPlaces) =>
      prevPlaces.map((place) =>
        place.id === id ? { ...place, [field]: value } : place
      )
    );
  };

  // Funktion zum Generieren der Code-Ausgabe
  const generateCode = () => {
    const eventObj: any = {
      id: eventId,
      label: label,
    };

    if (description.trim() !== '') {
      eventObj.description = `<>${description}</>`;
    }

    // Buttons
    if (buttons.length > 0) {
      eventObj.buttons = buttons.map((btn) => {
        const buttonObj: any = {};
        if (btn.label.trim() !== '') buttonObj.label = btn.label;

        const getAction: any = {};

        // itemsDelta
        if (btn.getAction.itemsDelta) {
          const itemsDelta: any = {};
          Object.values(btn.getAction.itemsDelta).forEach((entry) => {
            if (entry.item && entry.quantity) {
              itemsDelta[entry.item] = entry.quantity;
            }
          });
          if (Object.keys(itemsDelta).length > 0) {
            getAction.itemsDelta = itemsDelta;
          }
        }

        // economyDelta
        if (btn.getAction.economyDelta) {
          const { gold, edelsteine } = btn.getAction.economyDelta;
          const economyDelta: any = {};
          if (gold) economyDelta.gold = gold;
          if (edelsteine) economyDelta.edelsteine = edelsteine;
          if (Object.keys(economyDelta).length > 0) {
            getAction.economyDelta = economyDelta;
          }
        }

        // fluxDelta
        if (btn.getAction.fluxDelta) {
          const { feeling, item, buff, debuff } = btn.getAction.fluxDelta;
          const fluxDelta: any = {};
          if (feeling) fluxDelta.feeling = feeling;
          if (item) fluxDelta.item = item;
          if (buff) fluxDelta.buff = buff;
          if (debuff) fluxDelta.debuff = debuff;
          if (Object.keys(fluxDelta).length > 0) {
            getAction.fluxDelta = fluxDelta;
          }
        }

        // stateDelta
        if (btn.getAction.stateDelta) {
          const { life, rounds, attack, defense, luck } = btn.getAction.stateDelta;
          const stateDelta: any = {};
          if (life) stateDelta.life = life;
          if (rounds) stateDelta.rounds = rounds;
          if (attack) stateDelta.attack = attack;
          if (defense) stateDelta.defense = defense;
          if (luck) stateDelta.luck = luck;
          if (Object.keys(stateDelta).length > 0) {
            getAction.stateDelta = stateDelta;
          }
        }

        // baseDelta
        if (btn.getAction.baseDelta) {
          const { exp, reputation } = btn.getAction.baseDelta;
          const baseDelta: any = {};
          if (exp) baseDelta.exp = exp;
          if (reputation) baseDelta.reputation = reputation;
          if (Object.keys(baseDelta).length > 0) {
            getAction.baseDelta = baseDelta;
          }
        }

        // TriggerGroup
        if (btn.triggerGroup) {
          if (btn.triggerGroup === 'triggerQuest') {
            if (btn.getAction.triggerQuest && btn.getAction.triggerQuest.trim() !== '') {
              getAction.triggerQuest = btn.getAction.triggerQuest;
            }
          } else if (btn.triggerGroup === 'endQuest') {
            if (btn.getAction.endQuest && btn.getAction.endQuest.trim() !== '') {
              getAction.endQuest = btn.getAction.endQuest;
            }
          } else if (btn.triggerGroup === 'nextEvents') {
            if (btn.getAction.nextEvents && btn.getAction.nextEvents.length > 0) {
              getAction.nextEvents = btn.getAction.nextEvents;
            }
          }
        }

        // Message
        if (btn.message.trim() !== '') {
          getAction.message = `<>${btn.message}</>`;
        }

        // Assign getAction if not empty
        if (Object.keys(getAction).length > 0) {
          buttonObj.getAction = getAction;
        }

        return buttonObj;
      });
    }

    // Places
    if (places.length > 0) {
      eventObj.places = places.map((place) => {
        const placeObj: any = { place: place.place };
        if (place.probability > 0) {
          placeObj.probability = place.probability;
        }
        return placeObj;
      });
    }

    // Bereinigung des Objekts
    const cleanedEvent = cleanObject(eventObj);

    // Formatierung als JavaScript-Objekt
    const formattedEvent = formatAsJSX(cleanedEvent);

    setGeneratedCode(formattedEvent);
  };

  // Helper Funktion zum Bereinigen des Objekts
  const cleanObject = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj
        .map(cleanObject)
        .filter(
          (item) => item !== undefined && (typeof item !== 'object' || Object.keys(item).length > 0)
        );
    } else if (typeof obj === 'object' && obj !== null) {
      const cleaned: any = {};
      Object.keys(obj).forEach((key) => {
        if (
          obj[key] !== undefined &&
          obj[key] !== '' &&
          obj[key] !== null &&
          (typeof obj[key] !== 'object' || Object.keys(cleanObject(obj[key])).length > 0)
        ) {
          cleaned[key] = cleanObject(obj[key]);
        }
      });
      return cleaned;
    } else {
      return obj;
    }
  };

  // Helper Funktion zum Formatieren als JSX
  const formatAsJSX = (obj: any, indent: number = 0): string => {
    const indentation = '    '.repeat(indent);
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]';
      const items = obj.map((item) => formatAsJSX(item, indent + 1));
      return `[\n${items.join(',\n')}\n${indentation}]`;
    } else if (typeof obj === 'object' && obj !== null) {
      const entries = Object.entries(obj).map(([key, value]) => {
        return `${indentation}    ${key}: ${formatAsJSX(value, indent + 1)}`;
      });
      return `{\n${entries.join(',\n')}\n${indentation}}`;
    } else if (typeof obj === 'string') {
      // Überprüfen, ob der String mit <> beginnt und mit </> endet
      if (obj.startsWith('<>') && obj.endsWith('</>')) {
        return obj; // Als JSX-Fragment zurückgeben
      } else {
        // Escape von Backslashes und Anführungszeichen im String
        const escaped = obj.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        return `"${escaped}"`; // Als String zurückgeben
      }
    } else {
      return JSON.stringify(obj);
    }
  };

  // Handler zum Kopieren des generierten Codes in die Zwischenablage
  const handleCopyToClipboard = () => {
    if (!generatedCode) {
      alert('Es gibt keinen Code zum Kopieren!');
      return;
    }
    navigator.clipboard
      .writeText(generatedCode)
      .then(() => {
        setCopySuccess('Code wurde erfolgreich in die Zwischenablage kopiert!');
        setTimeout(() => setCopySuccess(''), 2000);
      })
      .catch((err) => {
        alert('Fehler beim Kopieren: ' + err);
      });
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
              ID<span style={{ color: 'red' }}>*</span>:
            </label>
            <input
              type="text"
              id="eventId"
              name="eventId"
              style={styles.input}
              required
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
            />
          </div>
          {/* Label */}
          <div style={styles.formGroup}>
            <label htmlFor="label" style={styles.label}>
              Label<span style={{ color: 'red' }}>*</span>:
            </label>
            <input
              type="text"
              id="label"
              name="label"
              style={styles.input}
              required
              value={label}
              onChange={(e) => setLabel(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Buttons Section */}
          <div style={styles.formSection}>
            <div style={styles.sectionHeader}>
              <h3>Buttons</h3>
              <button
                type="button"
                style={styles.sectionHeaderButton}
                onClick={handleAddButton}
              >
                Button hinzufügen
              </button>
            </div>
            <div>
              {buttons.map((btn, index) => (
                <div key={btn.id} style={styles.nestedSection}>
                  {/* Button Label */}
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      Button Label<span style={{ color: 'red' }}>*</span>:
                    </label>
                    <input
                      type="text"
                      name={`buttons-${index}-label`}
                      style={styles.input}
                      required
                      value={btn.label}
                      onChange={(e) =>
                        handleButtonChange(btn.id, 'label', e.target.value)
                      }
                    />
                  </div>

                  {/* GetAction */}
                  <div style={styles.formGroup}>
                    <label style={styles.label}>GetAction:</label>
                    <div style={styles.checkboxGroup}>
                      <label>
                        <input
                          type="checkbox"
                          name={`buttons-${index}-getAction-itemsDelta-enabled`}
                          checked={!!btn.getAction.itemsDelta}
                          onChange={(e) =>
                            handleGetActionChange(
                              btn.id,
                              'itemsDelta',
                              e.target.checked ? {} : undefined
                            )
                          }
                        />{' '}
                        itemsDelta
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name={`buttons-${index}-getAction-economyDelta-enabled`}
                          checked={!!btn.getAction.economyDelta}
                          onChange={(e) =>
                            handleGetActionChange(
                              btn.id,
                              'economyDelta',
                              e.target.checked
                                ? { gold: 0, edelsteine: 0 }
                                : undefined
                            )
                          }
                        />{' '}
                        economyDelta
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name={`buttons-${index}-getAction-fluxDelta-enabled`}
                          checked={!!btn.getAction.fluxDelta}
                          onChange={(e) =>
                            handleGetActionChange(
                              btn.id,
                              'fluxDelta',
                              e.target.checked
                                ? { feeling: '', item: '', buff: {}, debuff: {} }
                                : undefined
                            )
                          }
                        />{' '}
                        fluxDelta
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name={`buttons-${index}-getAction-stateDelta-enabled`}
                          checked={!!btn.getAction.stateDelta}
                          onChange={(e) =>
                            handleGetActionChange(
                              btn.id,
                              'stateDelta',
                              e.target.checked
                                ? { life: 0, rounds: 0, attack: 0, defense: 0, luck: 0 }
                                : undefined
                            )
                          }
                        />{' '}
                        stateDelta
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name={`buttons-${index}-getAction-baseDelta-enabled`}
                          checked={!!btn.getAction.baseDelta}
                          onChange={(e) =>
                            handleGetActionChange(
                              btn.id,
                              'baseDelta',
                              e.target.checked
                                ? { exp: 0, reputation: 0 }
                                : undefined
                            )
                          }
                        />{' '}
                        baseDelta
                      </label>
                    </div>
                  </div>

                  {/* itemsDelta Section */}
                  {btn.getAction.itemsDelta && (
                    <div style={styles.nestedSection}>
                      <label style={styles.label}>itemsDelta:</label>
                      <div style={styles.nestedSection}>
                        {Object.entries(btn.getAction.itemsDelta).map(
                          ([key, entry]) => (
                            <div key={key} style={styles.itemsDeltaEntry}>
                              {/* Kategorie Auswahl */}
                              <select
                                name={`buttons-${index}-getAction-itemsDelta-${key}-category`}
                                value={entry.category}
                                style={styles.input}
                                onChange={(e) =>
                                  handleItemsDeltaChange(
                                    btn.id,
                                    parseInt(key),
                                    'category',
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">--Wähle eine Kategorie--</option>
                                {Object.keys(itemCategories).map((category) => (
                                  <option key={category} value={category}>
                                    {category}
                                  </option>
                                ))}
                              </select>

                              {/* Item Auswahl */}
                              <select
                                name={`buttons-${index}-getAction-itemsDelta-${key}-item`}
                                value={entry.item}
                                style={styles.input}
                                disabled={!entry.category}
                                onChange={(e) =>
                                  handleItemsDeltaChange(
                                    btn.id,
                                    parseInt(key),
                                    'item',
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">--Wähle ein Item--</option>
                                {entry.category &&
                                  itemCategories[entry.category].map((item) => (
                                    <option key={item} value={item}>
                                      {item}
                                    </option>
                                  ))}
                              </select>

                              {/* Quantity Eingabe */}
                              <input
                                type="number"
                                name={`buttons-${index}-getAction-itemsDelta-${key}-quantity`}
                                placeholder="Zahl"
                                style={styles.input}
                                min={1}
                                value={entry.quantity}
                                disabled={!entry.item}
                                onChange={(e) =>
                                  handleItemsDeltaChange(
                                    btn.id,
                                    parseInt(key),
                                    'quantity',
                                    parseInt(e.target.value) || 0
                                  )
                                }
                              />

                              {/* Entfernen Button */}
                              <button
                                type="button"
                                style={styles.removeButton}
                                onClick={() =>
                                  handleRemoveItemsDelta(
                                    btn.id,
                                    parseInt(key)
                                  )
                                }
                              >
                                Entfernen
                              </button>
                            </div>
                          )
                        )}
                        <button
                          type="button"
                          style={styles.addButton}
                          onClick={() => handleAddItemsDelta(btn.id)}
                        >
                          Item hinzufügen
                        </button>
                      </div>
                    </div>
                  )}

                  {/* economyDelta Section */}
                  {btn.getAction.economyDelta && (
                    <div style={styles.nestedSection}>
                      <label style={styles.label}>economyDelta:</label>
                      <div style={styles.nestedSection}>
                        {/* Gold */}
                        <div style={styles.formGroup}>
                          <label htmlFor={`buttons-${index}-getAction-economyDelta-gold`} style={styles.label}>
                            Gold:
                          </label>
                          <input
                            type="number"
                            name={`buttons-${index}-getAction-economyDelta-gold`}
                            placeholder="Gold"
                            style={styles.input}
                            step={1}
                            value={btn.getAction.economyDelta.gold || 0}
                            onChange={(e) =>
                              handleGetActionChange(
                                btn.id,
                                'economyDelta',
                                {
                                  ...btn.getAction.economyDelta,
                                  gold: parseInt(e.target.value) || 0,
                                }
                              )
                            }
                          />
                        </div>
                        {/* Edelsteine */}
                        <div style={styles.formGroup}>
                          <label htmlFor={`buttons-${index}-getAction-economyDelta-edelsteine`} style={styles.label}>
                            Edelsteine:
                          </label>
                          <input
                            type="number"
                            name={`buttons-${index}-getAction-economyDelta-edelsteine`}
                            placeholder="Edelsteine"
                            style={styles.input}
                            step={1}
                            value={btn.getAction.economyDelta.edelsteine || 0}
                            onChange={(e) =>
                              handleGetActionChange(
                                btn.id,
                                'economyDelta',
                                {
                                  ...btn.getAction.economyDelta,
                                  edelsteine: parseInt(e.target.value) || 0,
                                }
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* fluxDelta Section */}
                  {btn.getAction.fluxDelta && (
                    <div style={styles.nestedSection}>
                      <label style={styles.label}>fluxDelta:</label>
                      <div style={styles.nestedSection}>
                        {/* Feeling */}
                        <div style={styles.formGroup}>
                          <label htmlFor={`buttons-${index}-getAction-fluxDelta-feeling`} style={styles.label}>
                            Feeling:
                          </label>
                          <input
                            type="text"
                            name={`buttons-${index}-getAction-fluxDelta-feeling`}
                            placeholder="Feeling"
                            style={styles.input}
                            value={btn.getAction.fluxDelta.feeling || ''}
                            onChange={(e) =>
                              handleGetActionChange(
                                btn.id,
                                'fluxDelta',
                                {
                                  ...btn.getAction.fluxDelta,
                                  feeling: e.target.value,
                                }
                              )
                            }
                          />
                        </div>
                        {/* Item */}
                        <div style={styles.formGroup}>
                          <label htmlFor={`buttons-${index}-getAction-fluxDelta-item`} style={styles.label}>
                            Item:
                          </label>
                          <input
                            type="text"
                            name={`buttons-${index}-getAction-fluxDelta-item`}
                            placeholder="Item"
                            style={styles.input}
                            value={btn.getAction.fluxDelta.item || ''}
                            onChange={(e) =>
                              handleGetActionChange(
                                btn.id,
                                'fluxDelta',
                                {
                                  ...btn.getAction.fluxDelta,
                                  item: e.target.value,
                                }
                              )
                            }
                          />
                        </div>
                        {/* Buff */}
                        <div style={styles.formGroup}>
                          <label htmlFor={`buttons-${index}-getAction-fluxDelta-buff`} style={styles.label}>
                            Buff:
                          </label>
                          <input
                            type="text"
                            name={`buttons-${index}-getAction-fluxDelta-buff`}
                            placeholder="Buff"
                            style={styles.input}
                            value={Object.keys(btn.getAction.fluxDelta.buff || {}).join(', ') || ''}
                            onChange={(e) =>
                              handleGetActionChange(
                                btn.id,
                                'fluxDelta',
                                {
                                  ...btn.getAction.fluxDelta,
                                  buff: parseBuffDebuff(e.target.value),
                                }
                              )
                            }
                          />
                        </div>
                        {/* Debuff */}
                        <div style={styles.formGroup}>
                          <label htmlFor={`buttons-${index}-getAction-fluxDelta-debuff`} style={styles.label}>
                            Debuff:
                          </label>
                          <input
                            type="text"
                            name={`buttons-${index}-getAction-fluxDelta-debuff`}
                            placeholder="Debuff"
                            style={styles.input}
                            value={Object.keys(btn.getAction.fluxDelta.debuff || {}).join(', ') || ''}
                            onChange={(e) =>
                              handleGetActionChange(
                                btn.id,
                                'fluxDelta',
                                {
                                  ...btn.getAction.fluxDelta,
                                  debuff: parseBuffDebuff(e.target.value),
                                }
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* stateDelta Section */}
                  {btn.getAction.stateDelta && (
                    <div style={styles.nestedSection}>
                      <label style={styles.label}>stateDelta:</label>
                      <div style={styles.nestedSection}>
                        {/* Life */}
                        <div style={styles.formGroup}>
                          <label htmlFor={`buttons-${index}-getAction-stateDelta-life`} style={styles.label}>
                            Life:
                          </label>
                          <input
                            type="number"
                            name={`buttons-${index}-getAction-stateDelta-life`}
                            placeholder="Life"
                            style={styles.input}
                            step={1}
                            value={btn.getAction.stateDelta.life || 0}
                            onChange={(e) =>
                              handleGetActionChange(
                                btn.id,
                                'stateDelta',
                                {
                                  ...btn.getAction.stateDelta,
                                  life: parseInt(e.target.value) || 0,
                                }
                              )
                            }
                          />
                        </div>
                        {/* Rounds */}
                        <div style={styles.formGroup}>
                          <label htmlFor={`buttons-${index}-getAction-stateDelta-rounds`} style={styles.label}>
                            Rounds:
                          </label>
                          <input
                            type="number"
                            name={`buttons-${index}-getAction-stateDelta-rounds`}
                            placeholder="Rounds"
                            style={styles.input}
                            step={1}
                            value={btn.getAction.stateDelta.rounds || 0}
                            onChange={(e) =>
                              handleGetActionChange(
                                btn.id,
                                'stateDelta',
                                {
                                  ...btn.getAction.stateDelta,
                                  rounds: parseInt(e.target.value) || 0,
                                }
                              )
                            }
                          />
                        </div>
                        {/* Attack */}
                        <div style={styles.formGroup}>
                          <label htmlFor={`buttons-${index}-getAction-stateDelta-attack`} style={styles.label}>
                            Attack:
                          </label>
                          <input
                            type="number"
                            name={`buttons-${index}-getAction-stateDelta-attack`}
                            placeholder="Attack"
                            style={styles.input}
                            step={1}
                            value={btn.getAction.stateDelta.attack || 0}
                            onChange={(e) =>
                              handleGetActionChange(
                                btn.id,
                                'stateDelta',
                                {
                                  ...btn.getAction.stateDelta,
                                  attack: parseInt(e.target.value) || 0,
                                }
                              )
                            }
                          />
                        </div>
                        {/* Defense */}
                        <div style={styles.formGroup}>
                          <label htmlFor={`buttons-${index}-getAction-stateDelta-defense`} style={styles.label}>
                            Defense:
                          </label>
                          <input
                            type="number"
                            name={`buttons-${index}-getAction-stateDelta-defense`}
                            placeholder="Defense"
                            style={styles.input}
                            step={1}
                            value={btn.getAction.stateDelta.defense || 0}
                            onChange={(e) =>
                              handleGetActionChange(
                                btn.id,
                                'stateDelta',
                                {
                                  ...btn.getAction.stateDelta,
                                  defense: parseInt(e.target.value) || 0,
                                }
                              )
                            }
                          />
                        </div>
                        {/* Luck */}
                        <div style={styles.formGroup}>
                          <label htmlFor={`buttons-${index}-getAction-stateDelta-luck`} style={styles.label}>
                            Luck:
                          </label>
                          <input
                            type="number"
                            name={`buttons-${index}-getAction-stateDelta-luck`}
                            placeholder="Luck"
                            style={styles.input}
                            step={1}
                            value={btn.getAction.stateDelta.luck || 0}
                            onChange={(e) =>
                              handleGetActionChange(
                                btn.id,
                                'stateDelta',
                                {
                                  ...btn.getAction.stateDelta,
                                  luck: parseInt(e.target.value) || 0,
                                }
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* baseDelta Section */}
                  {btn.getAction.baseDelta && (
                    <div style={styles.nestedSection}>
                      <label style={styles.label}>baseDelta:</label>
                      <div style={styles.nestedSection}>
                        {/* Exp */}
                        <div style={styles.formGroup}>
                          <label htmlFor={`buttons-${index}-getAction-baseDelta-exp`} style={styles.label}>
                            Exp:
                          </label>
                          <input
                            type="number"
                            name={`buttons-${index}-getAction-baseDelta-exp`}
                            placeholder="Exp"
                            style={styles.input}
                            step={1}
                            value={btn.getAction.baseDelta.exp || 0}
                            onChange={(e) =>
                              handleGetActionChange(
                                btn.id,
                                'baseDelta',
                                {
                                  ...btn.getAction.baseDelta,
                                  exp: parseInt(e.target.value) || 0,
                                }
                              )
                            }
                          />
                        </div>
                        {/* Reputation */}
                        <div style={styles.formGroup}>
                          <label htmlFor={`buttons-${index}-getAction-baseDelta-reputation`} style={styles.label}>
                            Reputation:
                          </label>
                          <input
                            type="number"
                            name={`buttons-${index}-getAction-baseDelta-reputation`}
                            placeholder="Reputation"
                            style={styles.input}
                            step={1}
                            value={btn.getAction.baseDelta.reputation || 0}
                            onChange={(e) =>
                              handleGetActionChange(
                                btn.id,
                                'baseDelta',
                                {
                                  ...btn.getAction.baseDelta,
                                  reputation: parseInt(e.target.value) || 0,
                                }
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TriggerQuest Group */}
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Trigger Quest Gruppe:</label>
                    <div style={styles.radioGroup}>
                      <label>
                        <input
                          type="radio"
                          name={`buttons-${index}-getAction-triggerGroup`}
                          value="triggerQuest"
                          checked={btn.triggerGroup === 'triggerQuest'}
                          onChange={(e) =>
                            handleButtonChange(btn.id, 'triggerGroup', e.target.value)
                          }
                        />{' '}
                        triggerQuest
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`buttons-${index}-getAction-triggerGroup`}
                          value="endQuest"
                          checked={btn.triggerGroup === 'endQuest'}
                          onChange={(e) =>
                            handleButtonChange(btn.id, 'triggerGroup', e.target.value)
                          }
                        />{' '}
                        endQuest
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`buttons-${index}-getAction-triggerGroup`}
                          value="nextEvents"
                          checked={btn.triggerGroup === 'nextEvents'}
                          onChange={(e) =>
                            handleButtonChange(btn.id, 'triggerGroup', e.target.value)
                          }
                        />{' '}
                        nextEvents
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`buttons-${index}-getAction-triggerGroup`}
                          value=""
                          checked={btn.triggerGroup === ''}
                          onChange={(e) =>
                            handleButtonChange(btn.id, 'triggerGroup', e.target.value)
                          }
                        />{' '}
                        Keine Auswahl
                      </label>
                    </div>
                  </div>

                  {/* TriggerQuest Fields */}
                  {btn.triggerGroup === 'triggerQuest' && (
                    <div style={styles.formGroup}>
                      <label htmlFor={`buttons-${index}-getAction-triggerQuest`} style={styles.label}>
                        triggerQuest:
                      </label>
                      <input
                        type="text"
                        name={`buttons-${index}-getAction-triggerQuest`}
                        placeholder="triggerQuest"
                        style={styles.input}
                        value={btn.getAction.triggerQuest || ''}
                        onChange={(e) =>
                          handleGetActionChange(
                            btn.id,
                            'triggerQuest',
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}
                  {btn.triggerGroup === 'endQuest' && (
                    <div style={styles.formGroup}>
                      <label htmlFor={`buttons-${index}-getAction-endQuest`} style={styles.label}>
                        endQuest:
                      </label>
                      <input
                        type="text"
                        name={`buttons-${index}-getAction-endQuest`}
                        placeholder="endQuest"
                        style={styles.input}
                        value={btn.getAction.endQuest || ''}
                        onChange={(e) =>
                          handleGetActionChange(
                            btn.id,
                            'endQuest',
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}
                  {btn.triggerGroup === 'nextEvents' && (
                    <div style={styles.nestedSection}>
                      <label style={styles.label}>nextEvents:</label>
                      <div style={styles.nextEventsContainer}>
                        {btn.getAction.nextEvents &&
                          btn.getAction.nextEvents.map((nextEvent, idx) => (
                            <div key={idx} style={styles.nextEvent}>
                              <input
                                type="text"
                                name={`buttons-${index}-getAction-nextEvents-${idx}-eventId`}
                                placeholder="eventId"
                                style={{ ...styles.input, marginRight: '10px' }}
                                value={nextEvent.eventId}
                                onChange={(e) =>
                                  handleNextEventChange(
                                    btn.id,
                                    idx,
                                    'eventId',
                                    e.target.value
                                  )
                                }
                              />
                              <input
                                type="number"
                                name={`buttons-${index}-getAction-nextEvents-${idx}-probability`}
                                placeholder="probability (%)"
                                style={{ ...styles.input, marginRight: '10px', width: '150px' }}
                                min={1}
                                max={100}
                                value={nextEvent.probability}
                                onChange={(e) =>
                                  handleNextEventChange(
                                    btn.id,
                                    idx,
                                    'probability',
                                    parseInt(e.target.value) || 0
                                  )
                                }
                              />
                              <button
                                type="button"
                                style={styles.removeButton}
                                onClick={() => handleRemoveNextEvent(btn.id, idx)}
                              >
                                Entfernen
                              </button>
                            </div>
                          ))}
                        <button
                          type="button"
                          style={styles.addNextEventButton}
                          onClick={() => handleAddNextEvent(btn.id)}
                        >
                          NextEvent hinzufügen
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Message Section */}
                  <div style={styles.formGroup}>
                    <label htmlFor={`buttons-${index}-getAction-message`} style={styles.label}>
                      Message:
                    </label>
                    <textarea
                      name={`buttons-${index}-getAction-message`}
                      rows={3}
                      placeholder="Nachricht hier eingeben"
                      style={styles.textarea}
                      value={btn.message}
                      onChange={(e) =>
                        handleButtonChange(btn.id, 'message', e.target.value)
                      }
                    ></textarea>
                  </div>

                  {/* Entfernen Button */}
                  <button
                    type="button"
                    style={styles.removeButton}
                    onClick={() => handleRemoveButton(btn.id)}
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
              <button
                type="button"
                style={styles.sectionHeaderButton}
                onClick={handleAddPlace}
              >
                Ort hinzufügen
              </button>
            </div>
            <div>
              {places.map((place, index) => (
                <div key={place.id} style={styles.nestedSection}>
                  {/* Ort Auswahl */}
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Ort:</label>
                    <select
                      name={`places-${index}-place`}
                      style={styles.input}
                      value={place.place}
                      onChange={(e) =>
                        handlePlaceChange(place.id, 'place', e.target.value)
                      }
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
                      name={`places-${index}-probability`}
                      min={1}
                      max={100}
                      placeholder="1-100"
                      style={styles.input}
                      value={place.probability}
                      onChange={(e) =>
                        handlePlaceChange(
                          place.id,
                          'probability',
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                  {/* Entfernen Button */}
                  <button
                    type="button"
                    style={styles.removeButton}
                    onClick={() => handleRemovePlace(place.id)}
                  >
                    Entfernen
                  </button>
                </div>
              ))}
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
          <pre style={styles.output}>{generatedCode}</pre>
          <button
            type="button"
            style={styles.copyButton}
            onClick={handleCopyToClipboard}
          >
            In Zwischenablage kopieren
          </button>
          {copySuccess && <div>{copySuccess}</div>}
        </div>
      </div>
    );
  };

  // Helper Funktion zum Parsen von Buffs und Debuffs (angenommen, komma-getrennte Werte)
  const parseBuffDebuff = (input: string): { [key: string]: number } => {
    const items = input
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item);
    const result: { [key: string]: number } = {};
    items.forEach((item) => {
      result[item] = 1; // Standardwert
    });
    return result;
  };

  // Funktion zum Generieren der Places Optionen
  const getPlacesOptions = (): string[] => {
    const places = [
      'Nordtor',
      'Westmauer',
      'Ostmauer',
      'Südmauer',
      'Brunnen',
      'Vorplatz',
      'Kirche',
      'Friedhof',
      'Rathaus',
      'Taverne',
      'Handelsbezirk',
      'Krämer',
      'Waffenladen',
      'Ausrüstungsladen',
      'Wohnbezirk',
      'Gassen',
      'Haus',
      'Weg',
      'Fluss',
      'Quelle',
      'See',
      'Sumpf',
      'Waldrand',
      'Wald',
      'Waldlichtung',
      'Dunkelwald',
      'Toilletenhaus',
      'Wiese',
      'Feld',
      'Steppe',
      'Ödland',
      'Hügelland',
      'Bergfuß',
      'Bergpfad',
      'Bergspitze',
      'Höhleneingang',
      'Höhle',
      'Schatzkammer',
    ];
    return places;
  };

  return <EventCreationForm />;
};

export default GenerateEvents;
