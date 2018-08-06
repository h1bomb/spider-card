import { DragSource } from 'react-dnd';
import Card from '../components/Card';

const Types = {
  CARD: 'card',
};

const cardSource = {
  beginDrag(props) {
    return props;
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

export default DragSource(Types.CARD, cardSource, collect)(Card);
