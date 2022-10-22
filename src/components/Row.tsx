import { useState } from 'react';
import { useDispatch, useSelector } from '../redux/hooks';
import { ADD_ROW, CHANGE_ROW_COLOR, CLEAR_ROW, REMOVE_ROW, RENAME_ROW } from '../redux/actions';
import ContentEditable from 'react-contenteditable';
import ItemContainer from './ItemContainer';
import SettingsModal from './SettingsModal';
import { Settings, MoveUp, MoveDown } from './icons'
import { TbItem, DispatchAction, AnyFunction, InputEvent } from '../utils/types';

interface RowProps {
  name: string,
  color: string,
  items: TbItem[],
  rowIndex: number,
  totalRows: number,
  moveRow: AnyFunction,
}

export default function Row({ name, color, items, rowIndex, totalRows, moveRow }: RowProps) {
  const [showSettings, setShowSettings] = useState(false)
  const [rowName, setRowName] = useState(name)
  const [inputFocus, setInputFocus] = useState(false)
  const dispatch = useDispatch()

  const changeName = (name: string) => {
    setRowName(name)
    dispatch({
      type: RENAME_ROW,
      rowIndex,
      name
    })
  }
console.log((rowName.match(/\n/)?.length || 0) + 1)
  return (
    <div className="flex items-stretch">
      <div className="w-1/12 flex items-center" style={{ backgroundColor: color, outline: `2px solid ${inputFocus ? '#000000' : '#00000000'}` }}>
        <textarea
          className="bg-inherit w-full text-center break-words overflow-y-clip resize-none"
          value={rowName}
          rows={(rowName.match(/\n/)?.length || 0) + 1}
          onChange={(e) => changeName(e.target.value)}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />
      </div>
      <ItemContainer id={rowIndex.toString()} items={items} />
      <div className="flex items-center">
        <Settings size={30} onClick={() => setShowSettings(true)} />
        <div className="flex flex-col">
          <MoveUp size={30} onClick={moveRow} aria-label="up" aria-disabled={rowIndex > 0} />
          <MoveDown size={30} onClick={moveRow} aria-label="down" aria-disabled={rowIndex < totalRows - 1} />
        </div>
      </div>

      <SettingsModal
        isOpen={showSettings}
        color={color}
        name={name}
        rowIndex={rowIndex}
        setIsOpen={setShowSettings}
        changeName={changeName}
      />
    </div>
  )
}