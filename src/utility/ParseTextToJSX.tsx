// Diese Funktion rendert den gesamten description-String,

import React from "react";
import { SYSTEM, CREATURE, NPC, PLACES } from "../data/colorfullStrings";

const lists = {
  SYSTEM,
  CREATURE,
  NPC,
  PLACES,
};

// Zeile für Zeile + Platzhalter + <br />
export function parseDescription(text: string) {
  const lines = text.split("\n");
  return lines.map((line, lineIndex) => {
    const parsedLine = parseLine(line); // <-- wir übergeben nur die line
    return (
      <React.Fragment key={lineIndex}>
        {parsedLine}
        {lineIndex < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

// Hilfsfunktion, um eine Zeile (ohne Zeilenumbruch) nach Platzhaltern zu durchsuchen.
function parseLine(line: string) {
  // z.B. Pattern mit Umlauten und Sonderzeichen abfangen
  const pattern = /{([^}]+)\.([^}]+)}/g;
  let nodes: Array<string | JSX.Element> = [];

  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(line)) !== null) {
    const index = match.index;
    const [placeholder, listName, keyName] = match;

    // Text vor dem Match anhängen
    if (index > lastIndex) {
      nodes.push(line.slice(lastIndex, index));
    }

    // Gültiger Platzhalter?
    if (lists[listName] && lists[listName][keyName]) {
      nodes.push(lists[listName][keyName]);
    } else {
      // Ungültig -> roter Hinweis
      nodes.push(
        <span key={`${listName}.${keyName}`} style={{ color: "red" }}>
          {placeholder} (ungültig!)
        </span>
      );
    }

    lastIndex = pattern.lastIndex;
  }

  // Reste des Textes, die nach dem letzten Platzhalter stehen
  if (lastIndex < line.length) {
    nodes.push(line.slice(lastIndex));
  }

  return nodes;
}

export function formatAsJSX(obj: any, indent = 0): string {
  const spaces = "  ".repeat(indent);

  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    const items = obj.map((x) => formatAsJSX(x, indent + 1));
    return `[\n${items.join(",\n")}\n${spaces}]`;
  } else if (typeof obj === "object" && obj !== null) {
    const entries = Object.entries(obj).map(([k, v]) => {
      return `  ${"  ".repeat(indent)}${k}: ${formatAsJSX(v, indent + 1)}`;
    });
    return `{\n${entries.join(",\n")}\n${spaces}}`;
  } else if (typeof obj === "string") {
    // Falls du KEIN echtes JSX mehr drin hast, entferne den Check:
    // if (obj.startsWith("<>") && obj.endsWith("</>")) {
    //   return obj;
    // }
    // Stattdessen wirklich immer in Anführungszeichen:
    return JSON.stringify(obj);
  }

  return String(obj);
}

//ANWENDUNG
// const MyComponent: React.FC<{ data: MyObject }> = ({ data }) => {
//   return (
//     <div>
//       {/* parseDescription liefert das JSX direkt zurück */}
//       {parseDescription(data.description)}
//     </div>
//   );
// };
