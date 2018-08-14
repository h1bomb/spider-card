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
  arrList.forEach((arr) => {
    if (arr.length < 13) {
      return;
    }
    const fullCardsSize = arr.length - 13;

    if (fullCardsSize > -1 && isOrder(arr.slice(fullCardsSize))) {
      arr.splice(fullCardsSize, 13);
    }
  });
};

// generate cards and random put in lists and the stack
export const genCardList = (state) => {
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
      allList.push(list);
      list = [];
      count = 0;
    }
  }
  Object.assign(state, {
    lists: allList,
    stack: sumArr.slice(50), // the rest cards put in stack
    move: null,
  });
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

  if (!cardKey && lists[index].length > 0) { // the cards can't move to not empty list
    return false;
  }

  if (!move) {
    if (!cardKey) return false; // set move cards must have a key
    return Object.assign(state, {
      move: {
        num,
        index,
        key: cardKey,
      },
    });
  }

  const bIndex = getCurIndex(lists[move.index], move.key);
  const moveArr = lists[move.index].slice(bIndex);
  if (index !== move.index
        && isOrder(moveArr)
        && (lists[index].length === 0 || num - 1 === moveArr[0].num)) {
    lists[move.index].splice(bIndex, moveArr.length);
    lists[index] = [...lists[index], ...moveArr];
    fullCards(lists);
  }

  const newState = {
    lists,
    move: null,
    stack,
  };

  Object.assign(state, newState);
  return false;
};

export const justMove = (card, state) => {
  Object.assign(state, { move: card.move });
  return moveCards(card, state);
};

// add cards to every list
export const add = (state) => {
  const {
    stack,
    lists,
    activeItems,
  } = state;
  activeItems.reverse();
  for (let i = 0; i < activeItems.length; i += 1) {
    lists[i].push(activeItems[i]);
  }

  fullCards(lists);
  Object.assign(state, {
    activeItems: [],
    lists,
    stack,
    move: null,
  });
};

export const motion = (state) => {
  const { stack, lists } = state;
  const end = stack.length;
  const begin = end - 10 > 0 ? end - 10 : 0;
  const sliceArr = stack.slice(begin, end);
  const activeItems = sliceArr
    .map((val, key) => ({ ...val, size: lists[sliceArr.length - key - 1].length }));
  Object.assign(state, {
    activeItems,
    stack: stack.slice(0, begin),
    move: null,
  });
};
