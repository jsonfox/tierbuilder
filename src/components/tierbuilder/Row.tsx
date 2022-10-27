import { useState } from 'react';
import { useDispatch } from '../../redux/hooks';
import { MOVE_ROW, RENAME_ROW } from '../../redux/actions';
import ContentEditable from 'react-contenteditable';
import ItemContainer from './ItemContainer';
import SettingsModal from './SettingsModal';
import { Settings, MoveUp, MoveDown } from '../icons';
import { TbItem } from '../../utils/types';

interface Props {
  name: string;
  color: string;
  items: TbItem[];
  rowIndex: number;
  totalRows: number;
}

export default function Row({
  name,
  color,
  items,
  rowIndex,
  totalRows
}: Props) {
  const [showSettings, setShowSettings] = useState(false);
  const dispatch = useDispatch();

  const changeName = (name: string) => {
    dispatch({
      type: RENAME_ROW,
      rowIndex,
      name
    });
  };

  const moveRow = (direction: string) => {
    dispatch({ type: MOVE_ROW, rowIndex, direction });
  };

  const iconBtnStyle = 'cursor-pointer hover:opacity-70';

  return (
    <div className="flex border-t border-black last-of-type:border-b">
      <ContentEditable
        tagName="label"
        className="flex w-24 cursor-text items-center justify-center break-all border-x border-black p-1 text-center leading-4"
        style={{ backgroundColor: color, minHeight: '80px', minWidth: '96px' }}
        html={name}
        onChange={(e) => changeName(e.target.value)}
      />
      <div className="flex-1 bg-neutral-800">
        <ItemContainer id={rowIndex.toString()} items={items} />
      </div>
      <div
        className="flex w-20 items-center justify-evenly bg-black text-white"
        style={{ minWidth: '80px' }}
      >
        <Settings
          className={iconBtnStyle}
          size={30}
          aria-label="settings"
          onClick={() => setShowSettings(true)}
        />
        <div className="flex flex-col space-y-2">
          <MoveUp
            className={iconBtnStyle}
            size={20}
            onClick={() => moveRow('up')}
            aria-label="up"
            aria-disabled={!(rowIndex > 0)}
          />
          <MoveDown
            className={iconBtnStyle}
            size={20}
            onClick={() => moveRow('down')}
            aria-label="down"
            aria-disabled={!(rowIndex < totalRows - 1)}
          />
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
  );
}
