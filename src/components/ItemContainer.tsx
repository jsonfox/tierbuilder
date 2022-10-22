import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';
import { TbItem } from '../utils/types';

interface Props {
  id: string,
  items: TbItem[]
}

export default function ItemContainer({ id, items }: Props) {
  return (
    <Droppable droppableId={id} direction="horizontal">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="flex flex-wrap">
            {items.map(({ imageUrl, key }, i) => (
              <Item
                key={key}
                itemId={key}
                index={i}
                imageUrl={imageUrl}
              />
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}