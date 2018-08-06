import React, { Component } from "react";
import { connect } from "react-redux";
import "../App.css";
import List from '../components/List';
import Stack from "../components/Stack";
import UndoRedo from "../components/UndoRedo";
import { addCards, moveCards, genCardList, justMove } from "../actions";

class App extends Component {
  componentDidMount() {
    this.props.genCardList();
  }

  render() {
    const { lists, stack, move, moveCards, addCards, justMove } = this.props;
    return (
      <div className="App">
          {lists.map((list, key) => (
            <List
              key={key}
              index={key}
              cards={list}
              curMove={move}
              move={moveCards}
              justMove={justMove}
            />
          ))}
          <Stack cards={stack} add={addCards} />
          <UndoRedo />
      </div>
    );
  }
}

export default connect(
  state => {
    console.log(state);
    return state.present;
  },
  dispatch => ({
    moveCards: ({ num, index, cardKey }) => {
      dispatch(moveCards({ num, index, cardKey }));
    },
    genCardList: () => {
      dispatch(genCardList());
    },
    addCards: () => {
      dispatch(addCards());
    },
    justMove:({ num, index, cardKey, move }) => {
      dispatch(justMove({index, num,cardKey, move}));
    },
  })
)(App);
