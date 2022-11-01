import ItemContainer from './ItemContainer';
import { TbItem } from '../../utils/types';

export default function DefaultArea({ items }: { items: TbItem[] }) {
  return <ItemContainer id="default" items={items} />;
}
