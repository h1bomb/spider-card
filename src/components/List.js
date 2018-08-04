import React from "react";
import DragCard from "../containers/DragCard";
const List = ({ cards, move, index, curMove }) => {
  const selectedKey = curMove ? curMove.key : 0;

  const TreeCard = ({ card }) => {
    if (!card) {
      return null;
    }
    return (
      <DragCard
        selected={selectedKey === card.key}
        index={index}
        cardKey={card.key}
        key={card.key}
        move={move}
        num={card.num}
      >
        <TreeCard card={card.children} />
      </DragCard>
    );
  };

  const treeCards = JSON.parse(JSON.stringify(cards.toArray()));
  let treeCardsElement = null;

  if (cards.size > 0) {
    treeCards.reduce((prev, card) => {
      prev.children = card;
      return card;
    });
    treeCardsElement = <TreeCard card={treeCards[0]} />;
  }
 
  // console.log(`${index} treecard size: ${cards.size}`,JSON.stringify(treeCards[0]))
  return (
    <div
      className="cards-list"
      onClick={() => {
        move({
          index
        });
      }}
    >
      {treeCardsElement}
    </div>
  );
};

export default List;
