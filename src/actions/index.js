export const GEN_CARD_LIST = 'GEN_CARD_LIST';
export const MOVE_CARDS = 'MOVE_CARDS';
export const ADD_CARDS = 'ADD_CARDS';

// generate random cards in list and stack
export const genCardList = ()=>({
    type: 'GEN_CARD_LIST',
});

// Move Cards in desc order
export const moveCards = ({ num, index, cardKey })=>({
    type: 'MOVE_CARDS',
    num,
    index,
    cardKey
});

// Add cards from stack to list
export const addCards = ()=>({
    type: 'ADD_CARDS',
});