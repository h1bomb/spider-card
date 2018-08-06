import React from "react";
import { DropTarget } from 'react-dnd';

const Types = {
  CARD: 'card',
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
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
    // let color = '#ccc';
    // if (isOver && canDrop) {
    //   color = 'green';
    // } else if (!isOver && canDrop) {
    //   color = 'yellow';
    // } else if (isOver && !canDrop) {
    //   color = 'red';
    // }
    return connectDropTarget(
      <div style={{ width: 60, height: 100, marginTop: -15 }}>
      </div>,
    );
  };

export default DropTarget(Types.CARD, spec, collect)(Box);
