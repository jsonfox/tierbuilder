import { Container } from 'react-bootstrap'
import ItemContainer from './ItemContainer';
import { TbItem } from '../utils/types';

export default function DefaultArea({ items }: { items: TbItem[] }) {
  return (
    <Container>
      <ItemContainer id="default" items={items} />
    </Container>
  )
}