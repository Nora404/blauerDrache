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
