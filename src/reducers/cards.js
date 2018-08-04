import {
    List
} from 'immutable';

// the cards array in desc order
const isOrder = (arr) => {
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

// get the current card's index in the list 
const getCurIndex = (arr, key) => {
    let curIndex = -1;
    arr.forEach((val, index) => {
        if (val.key === key) {
            curIndex = index;
        }
    });
    return curIndex;
}

// full desc card and clear this cards
const fullCards = (arrList) => {
    arrList.forEach((arr, key) => {
        if (arr.length < 13) {
            return;
        }
        const fullCards = arr.size - 13;

        if (fullCards > -1 && isOrder(arr.slice(fullCards))) {
            arrList = arrList.set(key, arr.splice(fullCards, 13));
        }
    });

    return arrList;
}

// generate cards and random put in lists and the stack
export const genCardList = () => {
    let sumArr = [];
    let keyValue = 1;
    for (let i = 0; i < 10; i++) { // generate all cards
        for (let k = 0; k < 13; k++) {
            sumArr.push({
                isFace: true,
                num: k + 1,
                key: keyValue++
            });
        }
    }

    sumArr.sort(() => Math.random() - 0.5); // random sort
    const allList = [];
    let count = 0;
    let list = [];

    for (let i = 0; i < 50; i++) { // put five cards in every list
        list.push(sumArr[i]);
        count++;
        if (count === 5) {
            allList.push(List(list));
            list = [];
            count = 0;
        }
    }
    return {
        lists: List(allList),
        stack: List(sumArr.slice(50)), //the rest cards put in stack
        move: null,
    };
}

// Move to the other list
export const move = (card, state) => {
    const {
        num,
        index,
        cardKey
    } = card;
    const {
        move,
        lists,
        stack
    } = state;
    let newState = {};

    if (!cardKey && lists.get(index).size > 0) { //the cards can't move to not empty list
        return newState;
    }

    if (!move) {
        if (!cardKey) return newState; // set move cards must have a key
        newState.move = {
            num,
            index,
            key: cardKey
        }
        return newState;
    }

    const bIndex = getCurIndex(lists.get(move.index), move.key);
    const moveArr = lists.get(move.index).slice(bIndex);
    let changedLists = lists;
    if (index !== move.index&&
        isOrder(moveArr) &&
        (lists.get(index).size === 0 || num - 1 === moveArr.get(0).num)) {
        changedLists = lists.set(move.index, lists.get(move.index).splice(bIndex, moveArr.size));
        changedLists = changedLists.set(index, lists.get(index).concat(moveArr));
        changedLists = fullCards(changedLists);
    }

    newState = {
        lists: changedLists,
        move: null,
        stack
    };

    return newState;
};

// add cards to every list
export const add = (state) => {
    const {
        stack,
        lists
    } = state;
    let curStack = stack;
    let changedLists = lists;
    for (let i = 0; i < 10; i++) {
        const list = changedLists.get(i).push(curStack.last())
        changedLists = changedLists.set(i, list);
        curStack = curStack.pop();
    }
    changedLists = fullCards(changedLists);
    return {
        lists: changedLists,
        stack: curStack,
        move: null
    };
};