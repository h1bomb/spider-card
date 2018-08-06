import undoable from 'redux-undo';

import {
  GEN_CARD_LIST,
  MOVE_CARDS,
  JUST_MOVE,
  ADD_CARDS,
} from '../actions';
import {
  genCardList,
  moveCards,
  justMove,
  add,
} from './cards';

const playCards = (state = {
  lists: [],
  stack: [],
  move: null,
}, action) => {
  switch (action.type) {
    case GEN_CARD_LIST:
      return genCardList();
    case MOVE_CARDS:
      return {
        ...state,
        ...moveCards(action, state),
      };
    case ADD_CARDS:
      return add(state);
    case JUST_MOVE:
      return {
        ...state,
        ...justMove(action, state),
      };
    default:
      return state;
  }
};

export default undoable(playCards);
