// NOTIZEN

// Wird nach jedem Update oder set im Store aufgerufen
// function checkAllQuestsOnStoreChange(newStore: GameStore) {
//     activeQuests.forEach(quest => {
//       quest.progress.forEach(step => {
//         if (step.status === "active") {
//           const updatedStatus = checkIfStepIsFulfilled(step, newStore);
//           if (updatedStatus === "done") {
//             // step.status = "done"
//             // Falls linear: den nächsten Step auf "active" setzen
//             // usw.
//           }
//         }
//       });
//     });
//   }


// NUR ein beispiel
// QuestStep haben wir mal so benannt:
// type ProgressStep = { type, target, status, haveItem?, enemy?, ... }

// function checkIfStepIsFulfilled(step: ProgressStep, store: GameStore): StepStatus {
//     if (step.status !== "active") return step.status; // Hat sich nicht verändert
  
//     switch (step.type) {
//       case "item":
//         if (step.haveItem) {
//           const { item: wantedItem, need } = step.haveItem;
//           const playerItems = store.playerEconomy.items[wantedItem];
//           const quantity = playerItems?.quantity ?? 0;
//           // Falls wir lineare Quests wollen: Erfüllt, wenn quantity >= need
//           if (quantity >= need) {
//             return "done";
//           }
//         }
//         return "active";
  
//       case "kill":
//         if (step.enemy) {
//           // z.B. step.enemy.count >= step.enemy.need
//           // oder du speicherst Kills und vergleichst
//           // ...
//         }
//         return "active";
  
//       // und so weiter für talk, stats, base, switch ...
  
//       default:
//         return step.status;
//     }
//   }
  