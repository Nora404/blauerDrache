// ParseTextToJSX.ts
import React from "react";
// Hier importierst du deine Listen (SYSTEM, CREATURE, NPC, PLACES)
// und ggf. Farbpaletten, falls du sie zentral ablegen willst.
import {
  SYSTEM,
  CREATURE,
  NPC,
  PLACES,
} from "../data/colorfullStrings";

// Hier importierst du deine beiden Komponenten: 
import { colorPalettes } from "../data/colorMappingData";
import { GradientText } from "./GradientText";
import MultiColoredLetters from "./MultiColoredLetters";
// ^ ggf. anpassen, falls die zweite Komponente in einer anderen Datei steckt

////////////////////////////////////////////
// 1) "Haupt"-Funktion parseDescription
////////////////////////////////////////////
export function parseDescription(inputText: string): React.ReactNode {
  // Erster Schritt: Wir erkennen die benutzerdefinierten Komponenten
  // ala {GradientText|rainbowColors}...{/GradientText} etc.
  const nodesWithComponents = parseCustomComponents(inputText);

  // Zweiter Schritt: In den String-Teilen ersetzen wir {SYSTEM.Leben} & Co
  const replacedVariables = parseVariables(nodesWithComponents);

  // Dritter Schritt: Zeilenumbrüche in <br /> umwandeln
  // (nur in den String-Teilen, React-Elemente bleiben unverändert)
  const finalResult = insertLineBreaks(replacedVariables);

  return finalResult;
}

////////////////////////////////////////////
// 2) parseCustomComponents
//    Erkennt {GradientText|xy}...{/GradientText}
//          {MultiColoredLetters|xy}...{/MultiColoredLetters}
//    und ersetzt sie durch <GradientText colors={...}>...</GradientText>
////////////////////////////////////////////
function parseCustomComponents(text: string): Array<string | React.ReactNode> {
  // Du kannst das Regex anpassen, falls du noch mehr Komponenten erlauben willst
  const pattern =
    /{(GradientText|MultiColoredLetters)\|([^}]+)}([\s\S]*?){\/\1}/g;

  let result: Array<string | React.ReactNode> = [];
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    const matchIndex = match.index;

    // Alles, was vor diesem Match steht, in den result-Array
    if (matchIndex > lastIndex) {
      result.push(text.slice(lastIndex, matchIndex));
    }

    const [full, componentName, paletteName, innerText] = match;

    // Passende Farbpalette holen oder Fallback
    const colors = colorPalettes[paletteName] || ["#ff00ff"];

    // React-Element erzeugen
    let element: React.ReactNode;
    if (componentName === "GradientText") {
      element = (
        <GradientText key={matchIndex} colors={colors}>
          {innerText}
        </GradientText>
      );
    } else {
      // MultiColoredLetters
      element = (
        <MultiColoredLetters key={matchIndex} colors={colors}>
          {innerText}
        </MultiColoredLetters>
      );
    }

    result.push(element);
    lastIndex = pattern.lastIndex;
  }

  // Rest anhängen
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result;
}

////////////////////////////////////////////
// 3) parseVariables
//    Durchläuft das Array aus string|ReactElement
//    und ersetzt in jedem string die {SYSTEM.Leben}-Platzhalter.
////////////////////////////////////////////
function parseVariables(
  nodes: Array<string | React.ReactNode>
): Array<string | React.ReactNode> {
  // Wir brauchen die vier Listen als "map", um {LISTNAME.KEY} aufzulösen
  const variableLists: Record<string, Record<string, JSX.Element>> = {
    SYSTEM,
    CREATURE,
    NPC,
    PLACES,
  };

  return nodes.map((node, index) => {
    if (typeof node === "string") {
      // In diesem String => Pattern matchen
      return parseLineWithVariables(node, variableLists);
    } else {
      // ReactElement => unverändert zurück
      return node;
    }
  }).flat();
}

function parseLineWithVariables(
  line: string,
  variableLists: Record<string, Record<string, JSX.Element>>
): Array<string | JSX.Element> {
  const pattern = /{([^}]+)\.([^}]+)}/g;
  let result: Array<string | JSX.Element> = [];
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(line)) !== null) {
    const index = match.index;
    if (index > lastIndex) {
      result.push(line.slice(lastIndex, index));
    }

    const [placeholder, listName, keyName] = match;
    if (variableLists[listName] && variableLists[listName][keyName]) {
      result.push(variableLists[listName][keyName]);
    } else {
      // Ungültig -> roter Hinweis
      result.push(
        <span key={`${listName}.${keyName}`} style={{ color: "red" }}>
          {placeholder} (ungültig!)
        </span>
      );
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < line.length) {
    result.push(line.slice(lastIndex));
  }

  return result;
}

////////////////////////////////////////////
// 4) insertLineBreaks
//    Ersetzt "\n" in allen string-Knoten durch <br />
////////////////////////////////////////////
function insertLineBreaks(
  nodes: Array<string | React.ReactNode>
): React.ReactNode {
  return nodes.map((node, index) => {
    if (typeof node === "string") {
      const parts = node.split("\n");
      return parts.map((part, i) => (
        <React.Fragment key={`${index}-${i}`}>
          {part}
          {i < parts.length - 1 && <br />}
        </React.Fragment>
      ));
    } else {
      // React-Element => unverändert
      return node;
    }
  });
}
