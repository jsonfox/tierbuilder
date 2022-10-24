import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';
import { TbItem } from '../../utils/types';

interface Props {
  id: string;
  items: TbItem[];
}

export default function ItemContainer({ id, items }: Props) {
  return (
    <Droppable droppableId={id} direction="horizontal">
      {(provided) => (
        <div
          className="max-auto"
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
