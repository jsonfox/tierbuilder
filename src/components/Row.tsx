import classNames from 'classnames';
import ContentEditable from 'react-contenteditable';
import { Row as RowContainer, Stack } from 'react-bootstrap';
import ItemContainer from './ItemContainer';
import { Settings, MoveUp, MoveDown } from './icons'
import { TbItem, DispatchAction } from '../utils/types';

interface RowProps {
  name: string,
  color: string,
  items: TbItem[],
  rowIndex: number,
  totalRows: number,
  moveRow: DispatchAction,
  changeName: DispatchAction
}

export default function Row({ name, color, items, rowIndex, totalRows, moveRow, changeName }: RowProps) {
  return (
    <RowContainer>
      <ContentEditable
        tagName="label"
        html={name}
        onChange={changeName}
        style={{ backgroundColor: color }}
      />
      <ItemContainer id={rowIndex.toString()} items={items} />
      <div className="d-flex align-items-center">
        <Settings size={30} />
        <Stack>
          <MoveUp size={30} onClick={moveRow} aria-direction="up" aria-disabled={rowIndex > 0} />
          <MoveDown size={30} onClick={moveRow} aria-direction="down" aria-disabled={rowIndex < totalRows - 1} />
        </Stack>
      </div>
    </RowContainer>
  )
}