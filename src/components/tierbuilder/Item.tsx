import { Draggable } from 'react-beautiful-dnd';
import className from 'classnames';

interface Props {
  index: number;
  imageUrl: string;
  itemId: string;
}

export default function Item({ index, imageUrl, itemId }: Props) {
  return (
    <Draggable draggableId={itemId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={className({ 'item--dragging': snapshot.isDragging })}
        >
          <div
            className="item"
            key={index}
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </div>
      )}
    </Draggable>
  );
}
