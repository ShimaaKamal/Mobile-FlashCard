import { AsyncStorage } from "react-native";
import { formatDecksResults } from "../utils/helpers";
const DECK_STORAGE_KEY = "FlashCard:deck";

// export function submitEntry({ entry, key }) {
//   return AsyncStorage.mergeItem(
//     CALENDAR_STORAGE_KEY,
//     JSON.stringify({
//       [key]: entry,
//     })
//   );
// }

// export function getCalenderResults() {
//   return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(formatCalendarResults);
// }

// export function removeEntry(key) {
//   return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then((results) => {
//     const data = JSON.stringify(results);
//     data[key] = undefined;
//     delete data[key];
//     AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
//   });
// }

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(formatDecksResults);
}
export function getDeck() {}
export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [title]: { title: title },
    })
  );
}
export function addCardToDeck(key, question, answer) {
  AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(formatDecksResults)
    .then((result) => {
      const deck = result[key];
      if (!deck.questios) {
        deck.questions = [];
      }
      deck.questions = deck.questions.concat([
        {
          question: question,
          answer: answer,
        },
      ]);
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(result));
    });
}
