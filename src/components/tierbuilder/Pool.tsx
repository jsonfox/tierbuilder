import React from 'react';
import ItemContainer from './ItemContainer';
import { TbItem } from '../../utils/types';

export default function DefaultArea({ items }: { items: TbItem[] }) {
  return (
    <div className="text-center">
      <span className="md:hidden">{'< Drag to scroll >'}</span>
      <ItemContainer
        id="pool"
        testId="pool"
        items={items}
        className="pool max-sm:sticky max-sm:bottom-0 flex overflow-x-scroll md:flex-wrap md:overflow-hidden"
      />
    </div>
  );
}
