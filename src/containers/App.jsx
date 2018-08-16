import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import List from '../components/List';
import Stack from '../components/Stack';
import UndoRedo from '../components/UndoRedo';
import {
  addCards, autoMove, genCardList, justMove, motionCards,
} from '../actions';

class App extends Component {
  componentDidMount() {
    const { genCardsList } = this.props;
    genCardsList();
  }

  render() {
    const {
      lists, stack, activeItems, move, moveClickCards, addCardsToList, justMoveCards,
    } = this.props;
    return (
      <div className="App">
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
        <UndoRedo />
      </div>
    );
  }
}

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
