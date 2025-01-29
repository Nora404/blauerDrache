import React from "react";
import Header from "../../../layout/Header/Header";
import Talk from "../../../utility/Formatted/Talk";
import { getItemCategories } from "../../../data/gameItems/ItemData";
import { useRootStore } from "../../../store";

const Collecting: React.FC = () => {
  const fragments = getItemCategories()["Fragmente"];
  const lahtheim = getItemCategories()["Beute-Lahtheim"];

  const { playerEconomy } = useRootStore();

  return (
    <div className="max-width">
      <h2>Deine Beute</h2>

      <Header>Fragmente der Erinnerung</Header>
      <p className="mb-2">
        {fragments.map((item) => {
          if (playerEconomy.data.collections.includes(item.name)) {
            return (
              <button className="btn-border" key={item.name}>
                {" "}
                {item.label} <br />
                <p className="mb-1 text-left">{item.description}</p>{" "}
              </button>
            );
          } else {
            return (
              <button className="btn-border" key={item.name}>
                <Talk color="gray">???</Talk>
              </button>
            );
          }
        })}
      </p>

      <Header>Leben in Lahtheim</Header>
      <p className="mb-2 category-section">
        {lahtheim.map((item) => {
          if (playerEconomy.data.collections.includes(item.name)) {
            return (
              <CollectItem
                itemName={item.label}
                description={item.description}
                key={item.name}
              />
            );
          } else {
            return <CollectItem key={item.name} />;
          }
        })}
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
  itemName?: React.ReactNode;
  description?: string;
};

const CollectItem: React.FC<CollectItemProps> = ({ itemName, description }) => {
  return (
    <button
      className="btn-border"
      style={{
        width: "190px",
        height: "135px",
        padding: "10px",
        margin: "10px",
      }}
    >
      {itemName ? (
        <>
          {itemName}
          <p
            className="text-left"
            style={{ fontSize: "80%", lineHeight: "130%" }}
          >
            {description}
          </p>
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
