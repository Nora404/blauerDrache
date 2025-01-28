import React from "react";
import Header from "../../../layout/Header/Header";
import SparklingText from "../../../utility/Formatted/Sparkling/SparklingText";
import Talk from "../../../utility/Formatted/Talk";
import { getItemCategories} from "../../../data/gameItems/ItemData";

const Collecting: React.FC = () => {
const fragments = getItemCategories()["Fragmente"];

  return (
    <div className="max-width">
      <h2>Deine Beute</h2>

      <Header>Fragmente der Erinnerung</Header>
      <p className="mb-2">
        {/* <button className="btn-border"> {redFragment.label} <br/><p className="mb-1 text-left">{redFragment.description}</p> </button> */}
        {fragments.map((item)=>{
          return (
            <button className="btn-border"> {item.label} <br/><p className="mb-1 text-left">{item.description}</p> </button>
          )
        })}
      </p>

      <Header>Leben in Lahtheim</Header>
      <p className="mb-2">
        <CollectItem /> <CollectItem /> <CollectItem /> <CollectItem />
        <CollectItem /> <CollectItem /> <CollectItem /> <CollectItem />
      </p>

      <Header>Konflikte in den Wäldern</Header>
      <p className="mb-2">
        <CollectItem /> <CollectItem /> <CollectItem /> <CollectItem />
        <CollectItem /> <CollectItem /> <CollectItem /> <CollectItem />
      </p>

      <Header>Wächter der Quelle</Header>
      <p className="mb-2">
        <CollectItem /> <CollectItem /> <CollectItem /> <CollectItem />
        <CollectItem /> <CollectItem /> <CollectItem /> <CollectItem />
      </p>

      <Header>Glaube und Ruinen</Header>
      <p className="mb-2">
        <CollectItem /> <CollectItem /> <CollectItem /> <CollectItem />
        <CollectItem /> <CollectItem /> <CollectItem /> <CollectItem />
      </p>

      <Header>Das was man sät</Header>
      <p className="mb-2">
        <CollectItem /> <CollectItem /> <CollectItem /> <CollectItem />
        <CollectItem /> <CollectItem /> <CollectItem /> <CollectItem />
      </p>

      <Header>Vom Winde verweht</Header>
      <p className="mb-2">
        <CollectItem /> <CollectItem /> <CollectItem /> <CollectItem />
        <CollectItem /> <CollectItem /> <CollectItem /> <CollectItem />
      </p>

      <Header>Spielplatz der Berge</Header>
      <p className="mb-2">
        <CollectItem /> <CollectItem /> <CollectItem /> <CollectItem />
        <CollectItem /> <CollectItem /> <CollectItem /> <CollectItem />
      </p>

      <Header>Reichtümer der Erde</Header>
      <p className="mb-2">
        <CollectItem /> <CollectItem /> <CollectItem /> <CollectItem />
        <CollectItem /> <CollectItem /> <CollectItem /> <CollectItem />
      </p>
    </div>
  );
};

export default Collecting;

type CollectItemProps = {
  itemName?: string;
  color?: string;
  description?: string;
};

const CollectItem: React.FC<CollectItemProps> = ({
  itemName,
  color = "#ffffff",
  description,
}) => {
  return (
    <button
      className="btn-border"
      style={{
        width: "190px",
        height: "125px",
        padding: "10px",
        margin: "10px",
      }}
    >
      {itemName ? (
        <>
          <SparklingText color={color}>{itemName}</SparklingText>
          <p className="text-left">{description}</p>
        </>
      ) : (
        <>
          <Talk color="gray">Unbekannt</Talk>
          <p
            style={{
              textAlign: "center",
            }}
          >
            <Talk color="gray">???</Talk>
          </p>
        </>
      )}
    </button>
  );
};
