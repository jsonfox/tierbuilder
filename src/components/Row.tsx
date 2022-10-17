import { useState } from 'react';
import { useDispatch, useSelector } from '../redux/hooks';
import { ADD_ROW, CHANGE_ROW_COLOR, CLEAR_ROW, REMOVE_ROW, RENAME_ROW } from '../redux/actions';
import ContentEditable from 'react-contenteditable';
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
  const [showSettings, setShowSettings] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const dispatch = useDispatch()

  const addRow = (direction: string) => dispatch({ type: ADD_ROW, rowIndex, direction })
  const removeRow = () => dispatch({ type: REMOVE_ROW, rowIndex })
  const clearRow = () => dispatch({ type: CLEAR_ROW, rowIndex })
  
  return (
    <div className="flex items-stretch">
      <ContentEditable
        tagName="label"
        html={name}
        onChange={changeName}
        style={{ backgroundColor: color }}
      />
      <ItemContainer id={rowIndex.toString()} items={items} />
      <div className="flex items-center">
        <Settings size={30} onClick={() => setShowSettings(true)} />
        <div className="flex">
          <MoveUp size={30} onClick={moveRow} aria-label="up" aria-disabled={rowIndex > 0} />
          <MoveDown size={30} onClick={moveRow} aria-label="down" aria-disabled={rowIndex < totalRows - 1} />
        </div>
      </div>

      <Modal show={showSettings} onHide={() => setShowSettings(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Row Settings
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* TODO: Add buttons and stuff */}
        </Modal.Body>
      </Modal>
    </div>
  )
}