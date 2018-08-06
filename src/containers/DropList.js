import React from "react";
import { DropTarget } from 'react-dnd';

const Types = {
  CARD: 'card',
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  };
}

const spec = {
  canDrop() {
    return true;
  },

  drop(props, monitor) {
    const {cards,index,justMove} = props;
    const item = monitor.getItem();
    const lastCard = cards.last();
    const param = {
        move:{
            num:item.num,
            index: item.index,
            key: item.cardKey,
        },
        index,
        cardKey: cards.size>0?lastCard.key:0,
        num: cards.size>0?lastCard.num:0,
    }
    justMove(param);
    console.log(props);
  },
};

const Box = ({ isOver, canDrop, connectDropTarget }) => {
    return connectDropTarget(
      <div style={{ width: 60, height: 100, marginTop: -15 }}>
      </div>,
    );
  };

export default DropTarget(Types.CARD, spec, collect)(Box);
