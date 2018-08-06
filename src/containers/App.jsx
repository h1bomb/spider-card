import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import List from '../components/List';
import Stack from '../components/Stack';
import UndoRedo from '../components/UndoRedo';
import {
  addCards, moveCards, genCardList, justMove,
} from '../actions';

class App extends Component {
  componentDidMount() {
    const { genCardsList } = this.props;
    genCardsList();
  }

  render() {
    const {
      lists, stack, move, moveClickCards, addCardsToList, justMoveCards,
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
        <Stack cards={stack} add={addCardsToList} />
        <UndoRedo />
      </div>
    );
  }
}

export default connect(
  state => state.present,
  dispatch => ({
    moveClickCards: ({ num, index, cardKey }) => {
      dispatch(moveCards({ num, index, cardKey }));
    },
    genCardsList: () => {
      dispatch(genCardList());
    },
    addCardsToList: () => {
      dispatch(addCards());
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
