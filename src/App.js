import React, { Component } from "react";
import "./App.css";
import List from "./components/List";
import Stack from "./components/Stack";

function isOrder(arr) {
  let ret = true;
  arr.reduce((prevVal, curVal) => {
    if (prevVal === -1 || prevVal.num - 1 !== curVal.num) {
      ret = false;
      return -1;
    } else {
      return curVal;
    }
  });
  return ret;
}

function getCurIndex(arr, key) {
  let curIndex = -1;
  arr.forEach((val, index) => {
    if (val.key === key) {
      curIndex = index;
    }
  });
  return curIndex;
}

function fullCards(arrList) {
  arrList.forEach(arr => {
    if (arr.length < 13) {
      return;
    }
    const fullCards = arr.length - 13;

    if (fullCards > -1 && isOrder(arr.slice(fullCards))) {
      arr = [...arr.splice(fullCards, 13)];
    }
  });
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      stack: [],
      move: null
    };
  }
  componentDidMount() {
    this.genCardList();
  }
  genCardList() {
    let sumArr = [];
    let keyValue = 1;
    for (let i = 0; i < 10; i++) {
      for (let k = 0; k < 13; k++) {
        sumArr.push({
          isFace: true,
          num: k + 1,
          key: keyValue++
        });
      }
    }
    sumArr.sort(() => Math.random() - 0.5);
    const allList = [];
    let count = 0;
    let list = [];
    for (let i = 0; i < 50; i++) {
      list.push(sumArr[i]);
      count++;
      if (count === 5) {
        allList.push([...list]);
        list = [];
        count = 0;
      }
    }
    this.setState({
      lists: allList,
      stack: sumArr.slice(50)
    });
  }
  move = ({ num, index, cardKey }) => {
    const { move, lists } = this.state;
    if (!cardKey && lists[index].length > 0) {
      return;
    }

    if (move) {
      const bIndex = getCurIndex(lists[move.index], move.key);
      const moveArr = lists[move.index].slice(bIndex);

      if (
        isOrder(moveArr) &&
        (lists[index].length === 0 || num - 1 === moveArr[0].num)
      ) {
        const mArr = lists[move.index].splice(bIndex, moveArr.length);
        lists[index] = [...lists[index], ...mArr];
        fullCards(lists);
        this.setState({
          lists: [...lists],
          move: null
        });
      } else {
        this.setState({
          move: null
        });
      }
    } else {
      if(!cardKey) {
        return;
      }
      this.setState({
        move: {
          num,
          index,
          key: cardKey
        }
      });
    }
  };
  add = () => {
    const { stack, lists } = this.state;
    for (let i = 0; i < 10; i++) {
      lists[i].push(stack.pop());
    }
    fullCards(lists);
    this.setState({
      lists: [...lists],
      stack: [...stack]
    });
  };
  render() {
    const { lists, stack, move } = this.state;
    return (
      <div className="App">
        {lists.map((list, key) => (
          <List key={key} index={key} cards={list} curMove={move} move={this.move} />
        ))}
        <Stack cards={stack} add={this.add} />
      </div>
    );
  }
}

export default App;
