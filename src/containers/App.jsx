import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import List from '../components/List';
import Stack from '../components/Stack';
import UndoRedo from '../components/UndoRedo';
import New from '../components/New';
import {
  addCards, autoMove, genCardList, justMove, motionCards,
} from '../actions';

const isWin = (lists) => {
  if (lists.length < 1) {
    return 1;
  }
  let ret = 2;
  lists.forEach((val) => {
    if (val.length > 0) {
      ret = 0;
    }
  });
  return ret;
};

const App = ({
  lists, stack, activeItems, genCardsList, move, moveClickCards, addCardsToList, justMoveCards,
}) => {
  let newGame = null;
  let redoCom = null;
  const ret = isWin(lists);
  if (ret) {
    newGame = (<New newGame={genCardsList} win={ret === 2} />);
  } else {
    redoCom = (<UndoRedo />);
  }

  return (
    <div className="App">
      {newGame}
      {lists.map((list, key) => (
        <List
            key={key} // eslint-disable-line
          index={key}
          cards={list}
          curMove={move}
          move={moveClickCards}
          justMove={justMoveCards}
        />
      ))}
      <Stack cards={stack} activeItems={activeItems} add={addCardsToList} />
      {redoCom}
    </div>
  );
};

export default connect(
  state => state.present,
  dispatch => ({
    moveClickCards: ({ num, index, cardKey }) => {
      dispatch(autoMove({ move: { num, index, key: cardKey } }));
    },
    genCardsList: () => {
      dispatch(genCardList());
    },
    addCardsToList: () => {
      dispatch(motionCards());
      setTimeout(() => {
        dispatch(addCards());
      }, 2400);
    },
    justMoveCards: ({
      num, index, cardKey, move,
    }) => {
      dispatch(justMove({
        index, num, cardKey, move,
      }));
    },
  }),
)(App);
