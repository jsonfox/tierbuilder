import { Draggable } from 'react-beautiful-dnd';
import className from 'classnames';

interface ItemProps {
  index: number,
  imageUrl: string,
  key: string
}

export default function DefaultArea({ index, imageUrl, key }: ItemProps) {
  return (
    <Draggable draggableId={key} key={key} index={index}>
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
  )
}