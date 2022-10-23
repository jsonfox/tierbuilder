import ItemContainer from './ItemContainer';
import { TbItem } from '../../utils/types';

export default function DefaultArea({ items }: { items: TbItem[] }) {
  return (
    <div className="container mx-auto">
      <ItemContainer id="default" items={items} />
    </div>
  );
}
