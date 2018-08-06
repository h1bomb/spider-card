import {
  List,
} from 'immutable';

// the cards array in desc order
const isOrder = (arr) => {
  let ret = true;
  arr.reduce((prevVal, curVal) => {
    if (prevVal === -1 || prevVal.num - 1 !== curVal.num) {
      ret = false;
      return -1;
    }
    return curVal;
  });
  return ret;
};

// get the current card's index in the list
const getCurIndex = (arr, key) => {
  let curIndex = -1;
  arr.forEach((val, index) => {
    if (val.key === key) {
      curIndex = index;
    }
  });
  return curIndex;
};

// full desc card and clear this cards
const fullCards = (arrList) => {
  let arrRet = arrList;
  arrList.forEach((arr, key) => {
    if (arr.length < 13) {
      return;
    }
    const fullCardsSize = arr.size - 13;

    if (fullCardsSize > -1 && isOrder(arr.slice(fullCardsSize))) {
      arrRet = arrList.set(key, arr.splice(fullCardsSize, 13));
    }
  });

  return arrRet;
};

// generate cards and random put in lists and the stack
export const genCardList = () => {
  const sumArr = [];
  let keyValue = 1;
  for (let i = 0; i < 10; i += 1) { // generate all cards
    for (let k = 0; k < 13; k += 1) {
      sumArr.push({
        isFace: true,
        num: k + 1,
        key: keyValue += 1,
      });
    }
  }

  sumArr.sort(() => Math.random() - 0.5); // random sort
  const allList = [];
  let count = 0;
  let list = [];

  for (let i = 0; i < 50; i += 1) { // put five cards in every list
    list.push(sumArr[i]);
    count += 1;
    if (count === 5) {
      allList.push(List(list));
      list = [];
      count = 0;
    }
  }
  return {
    lists: List(allList),
    stack: List(sumArr.slice(50)), // the rest cards put in stack
    move: null,
  };
};

// Move to the other list
export const moveCards = (card, state) => {
  const {
    num,
    index,
    cardKey,
  } = card;
  const {
    move,
    lists,
    stack,
  } = state;
  let newState = {};

  if (!cardKey && lists.get(index).size > 0) { // the cards can't move to not empty list
    return newState;
  }

  if (!move) {
    if (!cardKey) return newState; // set move cards must have a key
    newState.move = {
      num,
      index,
      key: cardKey,
    };
    return newState;
  }

  const bIndex = getCurIndex(lists.get(move.index), move.key);
  const moveArr = lists.get(move.index).slice(bIndex);
  let changedLists = lists;
  if (index !== move.index
        && isOrder(moveArr)
        && (lists.get(index).size === 0 || num - 1 === moveArr.get(0).num)) {
    changedLists = lists.set(move.index, lists.get(move.index).splice(bIndex, moveArr.size));
    changedLists = changedLists.set(index, lists.get(index).concat(moveArr));
    changedLists = fullCards(changedLists);
  }

  newState = {
    lists: changedLists,
    move: null,
    stack,
  };

  return newState;
};

export const justMove = (card, state) => {
  const newState = { ...state, move: card.move };
  return moveCards(card, newState);
};

// add cards to every list
export const add = (state) => {
  const {
    stack,
    lists,
  } = state;
  let curStack = stack;
  let changedLists = lists;
  for (let i = 0; i < 10; i += 1) {
    const list = changedLists.get(i).push(curStack.last());
    changedLists = changedLists.set(i, list);
    curStack = curStack.pop();
  }
  changedLists = fullCards(changedLists);
  return {
    lists: changedLists,
    stack: curStack,
    move: null,
  };
};
