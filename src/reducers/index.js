import undoable from 'redux-undo';
import produce from 'immer';

import {
  GEN_CARD_LIST,
  MOVE_CARDS,
  JUST_MOVE,
  ADD_CARDS,
  MOTION_CARDS,
} from '../actions';
import {
  genCardList,
  moveCards,
  justMove,
  add,
  motion,
} from './cards';

const cards = produce(
  (draft, action) => {
    switch (action.type) {
      case GEN_CARD_LIST:
        genCardList(draft);
        return draft;
      case MOVE_CARDS:
        moveCards(action, draft);
        return draft;
      case ADD_CARDS:
        add(draft);
        return draft;
      case MOTION_CARDS:
        motion(draft);
        return draft;
      case JUST_MOVE:
        justMove(action, draft);
        return draft;
      default:
        return draft;
    }
  },
  {
    lists: [],
    stack: [],
    move: null,
    activeItems: [],
  },
);


export default undoable(cards);
