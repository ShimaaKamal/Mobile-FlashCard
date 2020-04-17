import { RECIEVE_DECKS, ADD_DECK, ADD_CARD } from "../actions/index";

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECIEVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      };
    case ADD_CARD:
      return {
        ...state,
        [action.deckKey]: {
          ...state[action.deckKey],
          questions: state[action.deckKey].questions
            ? state[action.deckKey].questions.concat([action.card])
            : [].concat([action.card]),
        },
      };
    default:
      return state;
  }
}
