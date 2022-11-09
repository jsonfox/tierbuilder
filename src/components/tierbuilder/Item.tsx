import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

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
          role="item"
          className={snapshot.isDragging ? 'opacity-80' : ''}
          data-testid="item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className={'h-20 w-20 bg-cover'}
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </div>
      )}
    </Draggable>
  );
}
