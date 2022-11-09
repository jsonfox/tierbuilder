import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';
import { TbItem } from '../../utils/types';
import { joinClassNames } from '../../utils/helpers';

interface Props {
  id: string;
  items: TbItem[];
  className?: string;
  testId?: string;
}

export default function ItemContainer({ id, items, className, testId }: Props) {
  return (
    <Droppable droppableId={id} direction="horizontal">
      {(provided) => (
        <div
          role="item-container"
          className={joinClassNames(
            'item-container',
            className ?? 'flex flex-wrap overflow-hidden'
          )}
          data-testid={testId}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {items.map(({ key, imageUrl }, i) => (
            <Item key={key} itemId={key} index={i} imageUrl={imageUrl} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
