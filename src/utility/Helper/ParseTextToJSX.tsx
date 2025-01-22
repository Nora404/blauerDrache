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
    /{(GradientText|MultiColoredLetters)\|([^}]+)}([\s\S]*?){\/\1}/g;

  let result: Array<string | React.ReactNode> = [];
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      result.push(text.slice(lastIndex, matchIndex));
    }

    const [componentName, paletteName, innerText] = match;
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
      element = (
        <MultiColoredLetters key={matchIndex} colors={colors}>
          {innerText}
        </MultiColoredLetters>
      );
    }

    result.push(element);
    lastIndex = pattern.lastIndex;
  }

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

  return nodes.map((node) => {
    if (typeof node === "string") {
      return parseLineWithVariables(node, variableLists);
    } else {
      return node;
    }
  }).flat();
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