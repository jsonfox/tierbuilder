import { CirclePicker, ColorResult, SketchPicker } from 'react-color';
import { useState } from 'react';
import { useDispatch, useSelector } from '../redux/hooks';
import {
  ADD_ROW,
  CHANGE_ROW_COLOR,
  CLEAR_ROW,
  REMOVE_ROW,
  RENAME_ROW
} from '../redux/actions';
import Modal from 'react-modal';
import { AnyFunction, StateAction } from '../utils/types';

interface Props {
  isOpen: boolean;
  color: string;
  name: string;
  rowIndex: number;
  setIsOpen: StateAction;
  changeName: AnyFunction;
}

export default function SettingsModal({
  isOpen,
  color,
  name,
  rowIndex,
  setIsOpen,
  changeName
}: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const dispatch = useDispatch();

  const addRow = (direction: string) =>
    dispatch({ type: ADD_ROW, rowIndex, direction });
  const removeRow = () => dispatch({ type: REMOVE_ROW, rowIndex });
  const clearRow = () => dispatch({ type: CLEAR_ROW, rowIndex });
  const changeRowColor = (newColor: ColorResult) =>
    dispatch({
      type: CHANGE_ROW_COLOR,
      rowIndex,
      color: newColor.hex
    });

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
      <h3 className="modal-title">Row Settings</h3>
      <div>
        <div className="modal-controls">
          <button onClick={() => addRow('above')} className="modal-button">
            Add row above
          </button>
          <button onClick={() => addRow('below')} className="modal-button">
            Add row below
          </button>
          <button onClick={removeRow} className="modal-button">
            Remove row
          </button>
          <button onClick={clearRow} className="modal-button">
            Clear row
          </button>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => changeName(e.target.value)}
            placeholder={name}
            autoFocus
            className="modal-input"
          />
        </div>
        <div className="modal-colorpicker">
          {showPicker ? (
            <>
              <button
                className="colorpicker-toggle"
                onClick={() => setShowPicker(false)}
              >
                Choose from color list
              </button>
              <SketchPicker
                color={color}
                onChange={(newColor) => changeRowColor(newColor)}
              />
            </>
          ) : (
            <>
              <button
                className="colorpicker-toggle"
                onClick={() => setShowPicker(true)}
              >
                Choose custom color
              </button>
              <CirclePicker
                color={color}
                onChange={(newColor) => changeRowColor(newColor)}
              />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
