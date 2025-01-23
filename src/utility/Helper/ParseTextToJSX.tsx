//#region [imports]
import React from "react";
import {
  SYSTEM,
  CREATURE,
  NPC,
  PLACES,
} from "../../data/helper/colorfullStrings";
import { colorPalettes } from "../../data/helper/colorMappingData";
import { GradientText } from "../Formatted/GradientText";
import MultiColoredLetters from "../Formatted/MultiColoredLetters";
import Talk from "../Formatted/Talk";
//#endregion

//#region [helper]
export function parseDescription(inputText: string): React.ReactNode {
  const nodesWithComponents = parseCustomComponents(inputText);
  const replacedVariables = parseVariables(nodesWithComponents);
  const finalResult = insertLineBreaks(replacedVariables);

  return finalResult;
}
//#endregion

//#region
function parseCustomComponents(text: string): Array<string | React.ReactNode> {
  const pattern =
    /{(GradientText|MultiColoredLetters|Talk)\|([^}]+)}([\s\S]*?){\/\1}/g;

  let result: Array<string | React.ReactNode> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const matchIndex = match.index;
    // match[0] = kompletter Treffer inkl. geschweifte Klammern
    // match[1] = "GradientText" | "MultiColoredLetters" | "Talk"
    // match[2] = paletteName ODER Farbname, je nachdem
    // match[3] = InnerText, also das zwischen den beiden {...} Blöcken

    if (matchIndex > lastIndex) {
      // Text zwischen zwei Komponenten
      result.push(text.slice(lastIndex, matchIndex));
    }

    const compName = match[1];
    const paletteOrColor = match[2];
    const innerText = match[3];

    let element: React.ReactNode;

    if (compName === "GradientText") {
      // Hier nimmst du wie gehabt dein colorPalettes
      const colors = colorPalettes[paletteOrColor] || ["#ff00ff"];
      element = (
        <GradientText key={matchIndex} colors={colors}>
          {innerText}
        </GradientText>
      );
    } else if (compName === "MultiColoredLetters") {
      // genau so
      const colors = colorPalettes[paletteOrColor] || ["#ff00ff"];
      element = (
        <MultiColoredLetters key={matchIndex} colors={colors}>
          {innerText}
        </MultiColoredLetters>
      );
    } else if (compName === "Talk") {
      // Kommentar: Neu
      // "paletteOrColor" ist hier z.B. "pink" oder "#ff0000" oder "geflügeltesWesen"
      // Das Talk-Component resolved das selbst
      element = (
        <Talk key={matchIndex} color={paletteOrColor}>
          {innerText}
        </Talk>
      );
    }

    result.push(element);
    lastIndex = pattern.lastIndex;
  }

  // Wenn nach dem letzten Match noch Text übrig ist
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result;
}

//#endregion

//#region
function parseVariables(
  nodes: Array<string | React.ReactNode>
): Array<string | React.ReactNode> {
  const variableLists: Record<string, Record<string, JSX.Element>> = {
    SYSTEM,
    CREATURE,
    NPC,
    PLACES,
  };

  return nodes
    .map((node) => {
      if (typeof node === "string") {
        return parseLineWithVariables(node, variableLists);
      } else {
        return node;
      }
    })
    .flat();
}
//#endregion

//#region
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
//#endregion

//#region
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
      return node;
    }
  });
}
//#endregion
