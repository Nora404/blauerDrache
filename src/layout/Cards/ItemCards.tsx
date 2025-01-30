import { useState, MouseEvent } from "react";
import { Armor, ArmorName } from "../../data/gameItems/armorData";
import {
  emptyItemObj,
  Item,
  itemMap,
  ItemName,
} from "../../data/gameItems/ItemData";
import { Weapon, WeaponName } from "../../data/gameItems/weaponData";
import { SYSTEM } from "../../data/helper/colorfullStrings";
import "./ItemCard.css";
import { useRootStore } from "../../store";
import Talk from "../../utility/Formatted/Talk";
import MultiColoredLetters from "../../utility/Formatted/MultiColoredLetters";
import {
  blueColors,
  greenColors,
  redColors,
  yellowColors,
} from "../../data/helper/colorMappingData";
import { Buff, buffMap } from "../../data/buffData";
import { Consum } from "../../data/gameItems/consumData";
import { Debuff, debuffMap } from "../../data/debuffData";
import { PlayerStats } from "../../store/types";

/** NEU: Definiere einen Typ für den Modus */
type ItemCardMode = "view" | "buy" | "sell";

type ItemCardProps = {
  itemName: ItemName;
  quantity?: number;
  /** NEU: Hängt davon ab, ob wir das Item kaufen, verkaufen oder nur anzeigen wollen */
  mode?: ItemCardMode; // <-- hinzugefügt
};

/** NEU: Funktion, um den Verkaufs-Preis zu errechnen */
function getVendorPrice(ek?: number): number {
  if (!ek) return 0;
  return Math.floor(ek / 1.2);
}

const ItemCard: React.FC<ItemCardProps> = ({
  itemName,
  quantity,
  mode = "view", // Default auf "view"
}) => {
  const item: Item | Weapon | Armor | Consum =
    itemMap[itemName] || emptyItemObj;

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const { playerFlux, playerEconomy } = useRootStore();

  const buff: Buff | null = buffMap[item.buff];
  const debuff: Debuff | null = debuffMap[item.debuff];

  /** NEU: Preisvariablen für buy / sell */
  const buyPrice = item.ek || 0;
  const sellPrice = getVendorPrice(item.ek);

  // Öffnen/Schließen der Detailansicht
  const handleClick = () => {
    setShowDetails((prev) => !prev);
  };

  // Ausrüsten
  const handleItem = (e: MouseEvent) => {
    e.stopPropagation();
    const cat = itemMap[item.name].category;
    switch (cat) {
      case "Waffen":
        playerFlux.updateWeapon(item.name as WeaponName);
        break;
      case "Ausrüstung":
        playerFlux.updateArmor(item.name as ArmorName);
        break;
      default:
        playerFlux.updateInHand(item.name);
        return;
    }
  };

  // Konsumieren (z.B. Essen)
  const handleUse = (e: MouseEvent) => {
    e.stopPropagation();
    playerEconomy.consumeItem(item.name);
  };

  // Ablegen
  const handleDrop = (e: MouseEvent) => {
    e.stopPropagation();
    const cat = itemMap[item.name].category;
    switch (cat) {
      case "Waffen":
        playerFlux.updateWeapon("Nichts");
        break;
      case "Ausrüstung":
        playerFlux.updateArmor("Nichts");
        break;
      default:
        playerFlux.updateInHand("Nichts");
        return;
    }
  };

  // Wegwerfen
  const handleRemove = (e: MouseEvent) => {
    e.stopPropagation();
    playerEconomy.updateItems(item.name, -1);
  };

  /** NEU: Kaufen */
  const handleBuy = (e: MouseEvent) => {
    e.stopPropagation();
    // Hier deine Logik, z.B. Geld abziehen, Item ins Inventar packen etc.
    console.log("Kaufen-Logik hier implementieren", item.name);
  };

  /** NEU: Verkaufen */
  const handleSell = (e: MouseEvent) => {
    e.stopPropagation();
    // Hier deine Logik, z.B. Geld gutschreiben, Item aus Inventar entfernen etc.
    console.log("Verkaufen-Logik hier implementieren", item.name);
  };

  // Effektbeschreibung formatieren
  const formatEffect = (effect: Partial<PlayerStats>) => {
    return (
      <>
        {Object.entries(effect).map(([key, value]) => {
          switch (key) {
            case "life":
              return (
                <span key={key}>
                  {SYSTEM.Leben}: {value}
                </span>
              );
            case "energy":
              return (
                <span key={key}>
                  {SYSTEM.Tatendrang}: {value}
                </span>
              );
            case "attack":
              return (
                <span key={key}>
                  {SYSTEM.Angriff}: {value}
                </span>
              );
            case "defense":
              return (
                <span key={key}>
                  {SYSTEM.Rüstung}: {value}
                </span>
              );
            case "luck":
              return (
                <span key={key}>
                  {SYSTEM.Glück}: {value}
                </span>
              );
            default:
              return null;
          }
        })}
      </>
    );
  };

  // Buff- oder Debuff-Beschreibung
  const getBuffDescription = (buff: Buff | Debuff) => {
    const time = buff.duration === 1 ? "Sofort" : buff.duration + " Runden";
    return (
      <>
        {formatEffect(buff.effects)} ({time})
      </>
    );
  };

  return (
    <button className="btn-border item-card" onClick={handleClick}>
      <div className="full">
        {item.label} {quantity ? <span>(x{quantity})</span> : null}
        {/** NEU: Zeige Preis an, wenn Modus = buy oder sell */}
        {mode === "buy" && <div>Kaufen für: {buyPrice}</div>}
        {mode === "sell" && <div>Verkaufspreis: {sellPrice}</div>}
        {showDetails && (
          <div
            style={{
              fontSize: "80%",
              lineHeight: "130%",
              marginTop: "8px",
              marginBottom: "8px",
            }}
          >
            <Talk color="#C5EDFF">{item.description}</Talk>
          </div>
        )}
        {buff && (
          <div>
            <div>{buff.label}</div>
            <div>{getBuffDescription(buff)}</div>
          </div>
        )}
        {debuff && (
          <div>
            <div>{debuff.label}</div>
            <div>{getBuffDescription(debuff)}</div>
          </div>
        )}
        {/** Bsp: Wenn es Leben oder Energie gibt, Button zum Benutzen */}
        {item.life && (
          <div>
            {SYSTEM.Leben}: {item.life}
            {showDetails && mode === "view" && (
              <div>
                <button className="btn-border" onClick={handleUse}>
                  <MultiColoredLetters colors={blueColors}>
                    Benutzen
                  </MultiColoredLetters>
                </button>
              </div>
            )}
          </div>
        )}
        {item.energy && (
          <div>
            {SYSTEM.Tatendrang}: {item.energy}
            {showDetails && mode === "view" && (
              <div>
                <button className="btn-border" onClick={handleUse}>
                  <MultiColoredLetters colors={blueColors}>
                    Benutzen
                  </MultiColoredLetters>
                </button>
              </div>
            )}
          </div>
        )}
        {item.attack && (
          <div>
            {SYSTEM.Angriff}: {item.attack}
            {showDetails && mode === "view" && (
              <div>
                <button className="btn-border" onClick={handleDrop}>
                  <MultiColoredLetters colors={yellowColors}>
                    Ablegen
                  </MultiColoredLetters>
                </button>
              </div>
            )}
          </div>
        )}
        {item.defense && (
          <div>
            {SYSTEM.Verteidigung}: {item.defense}
            {showDetails && mode === "view" && (
              <div>
                <button className="btn-border" onClick={handleDrop}>
                  <MultiColoredLetters colors={yellowColors}>
                    Ablegen
                  </MultiColoredLetters>
                </button>
              </div>
            )}
          </div>
        )}
        {item.luck && (
          <div>
            {SYSTEM.Glück}: {item.luck}
            {showDetails && mode === "view" && (
              <div>
                <button className="btn-border" onClick={handleItem}>
                  Ausrüsten
                </button>
                <button className="btn-border" onClick={handleDrop}>
                  Ablegen
                </button>
              </div>
            )}
          </div>
        )}
        {/** NEU: Zeige Buttons abhängig vom Modus */}
        {showDetails && (
          <>
            {mode === "view" && (
              <>
                <button className="btn-border" onClick={handleItem}>
                  <MultiColoredLetters colors={greenColors}>
                    Ausrüsten
                  </MultiColoredLetters>
                </button>
                <button className="btn-border" onClick={handleRemove}>
                  <MultiColoredLetters colors={redColors}>
                    Wegwerfen
                  </MultiColoredLetters>
                </button>
              </>
            )}
            {mode === "buy" && (
              <button className="btn-border" onClick={handleBuy}>
                Jetzt kaufen
              </button>
            )}
            {mode === "sell" && (
              <button className="btn-border" onClick={handleSell}>
                Jetzt verkaufen
              </button>
            )}
          </>
        )}
      </div>
    </button>
  );
};

export default ItemCard;
