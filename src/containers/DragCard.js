import { DragSource } from 'react-dnd';
import Card from '../components/Card';
const Types = {
  CARD: "card"
};

const cardSource = {
  beginDrag(props) {
    console.log('draging card',props);
    return props;
  },

  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    console.log(item, dropResult);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

export default DragSource(Types.CARD, cardSource, collect)(Card);
