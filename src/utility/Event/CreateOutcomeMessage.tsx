// outcomeMessageHelpers.ts

import React from "react";
import { parseDescription } from "../../utility/Helper/ParseTextToJSX";
import { SYSTEM } from "../../data/helper/colorfullStrings";
import { GameAction } from "../../data/eventData";
import { getItemLabelByName, ItemName } from "../../data/gameItems/ItemData";

export function createOutcomeMessage(action: GameAction): React.ReactNode {
	return (
		<>
			{getOutcomeMessageBasis(action)}
			{getOutcomeMessageItems(action)}
			{getOutcomeMessageEconomy(action)}
			{getOutcomeMessageState(action)}
			{getOutcomeMessageBase(action)}
			{getOutcomeMessageFlux(action)}
		</>
	);
}

// Basisnachricht
export function getOutcomeMessageBasis(action: GameAction): React.ReactNode[] {
	const nodes: React.ReactNode[] = [];
	if (action.message) {
		nodes.push(parseDescription(action.message));
		nodes.push(<br key="br-msg" />);
	}
	return nodes;
}

// ItemsDelta
export function getOutcomeMessageItems(action: GameAction): React.ReactNode[] {
	const nodes: React.ReactNode[] = [];
	if (action.itemsDelta) {
		const items = Object.entries(action.itemsDelta).filter(([_, delta]) => delta !== 0);
		if (items.length > 0) {
			nodes.push(<br key="br-items" />);
			items.forEach(([item, delta], index) => {
				const label = getItemLabelByName(item as ItemName);
				const verbToken = delta > 0 ? "{SYSTEM.erhalten}" : "{SYSTEM.abgegeben}";
				nodes.push(
					<span key={`item-${index}`}>
						{Math.abs(delta)} {label} {parseDescription(verbToken)}
					</span>
				);
				if (index < items.length - 1) {
					nodes.push(<span key={`item-comma-${index}`}>, </span>);
				}
			});
		}
	}
	return nodes;
}

// EconomyDelta
export function getOutcomeMessageEconomy(action: GameAction): React.ReactNode[] {
	const nodes: React.ReactNode[] = [];
	const econNodes: React.ReactNode[] = [];
	if (action.economyDelta) {
		if (typeof action.economyDelta.gold === "number" && action.economyDelta.gold !== 0) {
			const verbToken = action.economyDelta.gold > 0 ? "{SYSTEM.erhalten}" : "{SYSTEM.bezahlt}";
			econNodes.push(
				<span key="gold">
					{Math.abs(action.economyDelta.gold)} {parseDescription("{SYSTEM.Gold}")}{" "}
					{parseDescription(verbToken)}
				</span>
			);
		}
		if (
			typeof action.economyDelta.edelsteine === "number" &&
			action.economyDelta.edelsteine !== 0
		) {
			const verbToken =
				action.economyDelta.edelsteine > 0 ? "{SYSTEM.erhalten}" : "{SYSTEM.bezahlt}";
			if (econNodes.length > 0) {
				econNodes.push(<span key="econ-comma">, </span>);
			}
			econNodes.push(
				<span key="edelsteine">
					{Math.abs(action.economyDelta.edelsteine)} {parseDescription("{SYSTEM.Edelsteine}")}{" "}
					{parseDescription(verbToken)}
				</span>
			);
		}
		if (econNodes.length > 0) {
			nodes.push(<br key="br-econ" />);
			nodes.push(...econNodes);
		}
	}
	return nodes;
}

// StateDelta (PlayerStats: life, actionPoints, attack, defense, luck)
export function getOutcomeMessageState(action: GameAction): React.ReactNode[] {
	const nodes: React.ReactNode[] = [];
	if (action.stateDelta) {
		const stateNodes: React.ReactNode[] = [];
		const { life, actionPoints, attack, defense, luck } = action.stateDelta;
		if (typeof life === "number" && life !== 0) {
			const verb = life > 0 ? "{SYSTEM.erhöht}" : "{SYSTEM.verringert}";
			stateNodes.push(
				<span key="life">
					{SYSTEM.Leben} {parseDescription(verb)} um {Math.abs(life)}
				</span>
			);
		}
		if (typeof actionPoints === "number" && actionPoints !== 0) {
			const verb = actionPoints > 0 ? "{SYSTEM.erhalten}" : "{SYSTEM.verloren}";
			stateNodes.push(
				<span key="actionPoints">
					{SYSTEM.Aktionen} {parseDescription(verb)} um {Math.abs(actionPoints)}
				</span>
			);
		}
		if (typeof attack === "number" && attack !== 0) {
			const verb = attack > 0 ? "{SYSTEM.erhöht}" : "{SYSTEM.verringert}";
			stateNodes.push(
				<span key="attack">
					{SYSTEM.Angriff} {parseDescription(verb)} um {Math.abs(attack)}
				</span>
			);
		}
		if (typeof defense === "number" && defense !== 0) {
			const verb = defense > 0 ? "{SYSTEM.erhöht}" : "{SYSTEM.verringert}";
			stateNodes.push(
				<span key="defense">
					{SYSTEM.Verteidigung} {parseDescription(verb)} um {Math.abs(defense)}
				</span>
			);
		}
		if (typeof luck === "number" && luck !== 0) {
			const verb = luck > 0 ? "{SYSTEM.erhöht}" : "{SYSTEM.verringert}";
			stateNodes.push(
				<span key="luck">
					{SYSTEM.Glück} {parseDescription(verb)} um {Math.abs(luck)}
				</span>
			);
		}
		if (stateNodes.length > 0) {
			nodes.push(<br key="br-state" />);
			stateNodes.forEach((node, index) => {
				if (index > 0) {
					nodes.push(<span key={`state-comma-${index}`}>, </span>);
				}
				nodes.push(node);
			});
		}
	}
	return nodes;
}

// BaseDelta (PlayerBase: z. B. Ruf, Leumund, exp)
export function getOutcomeMessageBase(action: GameAction): React.ReactNode[] {
	const nodes: React.ReactNode[] = [];
	if (action.baseDelta) {
		const baseNodes: React.ReactNode[] = [];
		if (typeof action.baseDelta.ruf === "number" && action.baseDelta.ruf !== 0) {
			const verb = action.baseDelta.ruf > 0 ? "{SYSTEM.verbessert}" : "{SYSTEM.verschlechtert}";
			baseNodes.push(
				<span key="ruf">
					{SYSTEM.Ruf} {parseDescription(verb)} um {Math.abs(action.baseDelta.ruf)}
				</span>
			);
		}
		if (typeof action.baseDelta.leumund === "number" && action.baseDelta.leumund !== 0) {
			const verb = action.baseDelta.leumund > 0 ? "{SYSTEM.verbessert}" : "{SYSTEM.verschlechtert}";
			baseNodes.push(
				<span key="leumund">
					{SYSTEM.Leumund} {parseDescription(verb)} um {Math.abs(action.baseDelta.leumund)}
				</span>
			);
		}
		if (typeof action.baseDelta.exp === "number" && action.baseDelta.exp !== 0) {
			const verb = action.baseDelta.exp > 0 ? "{SYSTEM.erhalten}" : "{SYSTEM.verloren}";
			baseNodes.push(
				<span key="exp">
					{SYSTEM.Erfahrung} {parseDescription(verb)} um {Math.abs(action.baseDelta.exp)}
				</span>
			);
		}
		if (baseNodes.length > 0) {
			nodes.push(<br key="br-base" />);
			baseNodes.forEach((node, index) => {
				if (index > 0) {
					nodes.push(<span key={`base-comma-${index}`}>, </span>);
				}
				nodes.push(node);
			});
		}
	}
	return nodes;
}

// FluxDelta (PlayerFlux: buff und debuff)
export function getOutcomeMessageFlux(action: GameAction): React.ReactNode[] {
	const nodes: React.ReactNode[] = [];
	if (action.fluxDelta) {
		const fluxNodes: React.ReactNode[] = [];
		if (action.fluxDelta.buff) {
			const buffs = Object.entries(action.fluxDelta.buff).filter(([_, value]) => value !== 0);
			buffs.forEach(([buffName, value], index) => {
				const verb = value > 0 ? "{SYSTEM.erhalten}" : "{SYSTEM.verloren}";
				fluxNodes.push(
					<span key={`buff-${index}`}>
						Buff {buffName} {parseDescription(verb)}
					</span>
				);
			});
		}
		if (action.fluxDelta.debuff) {
			const debuffs = Object.entries(action.fluxDelta.debuff).filter(([_, value]) => value !== 0);
			debuffs.forEach(([debuffName, value], index) => {
				const verb =
					value > 0
						? "{ColoredText|rot|italic}erhalten{/ColoredText}"
						: "{ColoredText|grün|italic}verlohren{/ColoredText}";
				fluxNodes.push(
					<span key={`debuff-${index}`}>
						Debuff {debuffName} {parseDescription(verb)}
					</span>
				);
			});
		}
		if (fluxNodes.length > 0) {
			nodes.push(<br key="br-flux" />);
			fluxNodes.forEach((node, index) => {
				if (index > 0) {
					nodes.push(<span key={`flux-comma-${index}`}>, </span>);
				}
				nodes.push(node);
			});
		}
	}
	return nodes;
}
