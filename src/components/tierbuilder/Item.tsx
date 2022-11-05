import { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  index: number;
  imageUrl: string;
  itemId: string;
  delay?: number;
}

export default function Item({ index, imageUrl, itemId, delay = 0 }: Props) {
  const [src, setSrc] = useState('');

  useEffect(() => {
    const img = new window.Image();
    img.onload = () =>
      setTimeout(() => {
        setSrc(img.src);
      }, delay);
    img.src = imageUrl;
  }, []);

  return src ? (
    <Draggable draggableId={itemId} index={index}>
      {(provided, snapshot) => (
        <div
          className={snapshot.isDragging ? 'opacity-80' : ''}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className={'h-20 w-20 bg-cover'}
            style={{ backgroundImage: `url(${src})` }}
          />
        </div>
      )}
    </Draggable>
  ) : (
    <div className={'h-20 w-20 animate-pulse cursor-progress bg-slate-300'} />
  );
}
