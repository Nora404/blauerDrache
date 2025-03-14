import React, { useState } from "react";
import { EditorContextProvider } from "./Context/EventContext";
import ActionButton from "../../layout/ActionButtons/ActionButton";
import Admincenter from "./01-Admincenter/Admincenter";
import { TestEventManager } from "./03-EventTester/EventTester";
import { HiddenLine } from "../../layout/HiddenLine";
import { SingelTextEditor } from "./02-TextEditor/SingelTextEditor";
import { GenerateItems } from "./07-ItemsCreation/GenerateItems";
import { GenerateBattels } from "./06-BattelCreation/GenerateBattels";
import EventCreationForm from "./04-EventsCreation/GenerateEvents";
import { GenerateDeBuff } from "./08-DeBuffsCreator/GenerateDeBuff";
import GenerateQuests from "./05-QuestEditor/GenerateQuest";

const Editor: React.FC = () => {
	const [side, setSide] = useState<number>(1);

	const buttons = [
		{ action: 1, label: "Admincenter" },
		{ action: 2, label: "Text Editor" },
		{ action: 3, label: "Event Testen" },
		{ action: 4, label: "Events Creation" },
		{ action: 5, label: "Quest Creation" },
		{ action: 6, label: "Battel Creation" },
		{ action: 7, label: "Items Creation" },
		{ action: 8, label: "DeBuffs Creation" },
	];

	const handleClick = (side: number) => {
		setSide(side);
	};

	return (
		<EditorContextProvider>
			<div className="max-widht">
				<div className="grid-3 w-full">
					{buttons.map((btn, index) => (
						<ActionButton
							key={index}
							style={{ margin: 0 }}
							onClick={() => handleClick(btn.action)}
							label={btn.label}
						/>
					))}
				</div>

				{side === 1 && <Admincenter />}
				{side === 2 && <SingelTextEditor />}
				{side === 3 && <TestEventManager />}
				{side === 4 && <EventCreationForm />}
				{side === 5 && <GenerateQuests />}
				{side === 6 && <GenerateBattels />}
				{side === 7 && <GenerateItems />}
				{side === 8 && <GenerateDeBuff />}
			</div>

			<HiddenLine />
		</EditorContextProvider>
	);
};

export default Editor;
