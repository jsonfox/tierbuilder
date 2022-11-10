import React, { useState } from 'react';
import { useDispatch } from '../../redux/hooks';
import { MOVE_ROW, RENAME_ROW } from '../../redux/actions';
import ContentEditable from 'react-contenteditable';
import ItemContainer from './ItemContainer';
import SettingsModal from './SettingsModal';
import { Settings, MoveUp, MoveDown } from '../icons';
import { TbItem } from '../../utils/types';
import { IconButton } from '../generic';

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

  return (
    <div
      role="row"
      className="row flex outline outline-1 outline-black"
      data-testid="row"
    >
      <ContentEditable
        tagName="label"
        className="flex w-24 cursor-text items-center justify-center break-all border-r border-black p-1 text-center leading-4"
        style={{ backgroundColor: color, minHeight: '80px', minWidth: '96px' }}
        html={name}
        onChange={(e) => changeName(e.target.value)}
        data-testid="label"
      />
      <div className="min-w-[80px] flex-1 bg-neutral-800">
        <ItemContainer id={rowIndex.toString()} items={items} />
      </div>
      <div className="flex w-20 items-center justify-evenly bg-black text-white">
        <IconButton
          Icon={Settings}
          size={30}
          hoverClassNames="opacity-80 rotate-[60deg]"
          onClick={() => setShowSettings(true)}
        />
        <div className="flex flex-col space-y-2">
          <IconButton
            Icon={MoveUp}
            hoverClassNames="opacity-80 translate-y-[1px]"
            activeClassNames="translate-y-[-1px]"
            onClick={() => moveRow('up')}
            aria-disabled={!(rowIndex > 0)}
          />
          <IconButton
            Icon={MoveDown}
            hoverClassNames="opacity-80 translate-y-[-1px]"
            activeClassNames="translate-y-[1px]"
            onClick={() => moveRow('down')}
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
