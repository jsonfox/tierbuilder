import React, { useState } from 'react';
import { ColorResult, TwitterPicker } from 'react-color';
import { useSelector, useDispatch } from '../../redux/hooks';
import {
  ADD_ROW,
  CHANGE_ROW_COLOR,
  CLEAR_ROW,
  REMOVE_ROW
} from '../../redux/actions';
import Modal from 'react-modal';
import { COLORS } from '../../utils/constants';
import { initialState, StateAction } from '../../utils/types';
import { Close } from '../icons';
import { Button } from '../generic';

interface Props {
  isOpen: boolean;
  color: string;
  name: string;
  rowIndex: number;
  setIsOpen: StateAction;
  changeName: (name: string) => void;
}

export default function SettingsModal({
  isOpen,
  color,
  name,
  rowIndex,
  setIsOpen,
  changeName
}: Props) {
  const [isClosing, setIsClosing] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state).tierbuilder ?? initialState;

  const addRow = (direction: string) => {
    dispatch({ type: ADD_ROW, rowIndex, direction });
  };

  const removeRow = () => {
    setIsOpen(false);
    dispatch({ type: REMOVE_ROW, rowIndex });
  };

  const clearRow = () => {
    dispatch({ type: CLEAR_ROW, rowIndex });
  };

  const changeRowColor = (newColor: ColorResult) => {
    dispatch({
      type: CHANGE_ROW_COLOR,
      rowIndex,
      color: newColor.hex
    });
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 100);
  };

  return (
    <Modal
      role="modal"
      className={`${
        isClosing ? 'out ' : ''
      }relative mx-auto flex flex-col items-center space-y-4 rounded-sm bg-white pt-2 pb-10 text-center md:w-2/3 lg:w-1/2`}
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: '#00000066'
        }
      }}
      onRequestClose={closeModal}
    >
      <Close
        className="absolute top-0 right-0 mr-1 cursor-pointer opacity-30 hover:scale-110 hover:opacity-60"
        size={30}
        onClick={closeModal}
      />
      <section className="space-y-1">
        <label className="text-lg font-semibold" htmlFor="colorpicker">
          Choose Label Background
        </label>
        <TwitterPicker
          className="picker"
          color={color}
          colors={[...COLORS, color]}
          triangle="hide"
          onChange={(newColor) => changeRowColor(newColor)}
        />
      </section>
      <section className="space-y-1">
        <label className="text-lg font-semibold" htmlFor="row-label">
          Edit Label Text
        </label>
        <textarea
          className="w-full border border-neutral-500 px-1"
          name="row-label"
          value={name}
          onChange={(e) => changeName(e.target.value)}
          autoFocus
        />
      </section>
      <section className="flex w-full justify-center space-x-3">
        <div className="flex w-1/3 flex-col space-y-2">
          <Button onClick={() => addRow('above')}>Add row above</Button>
          <Button onClick={() => addRow('below')}>Add row below</Button>
        </div>
        <section className="flex w-1/3 flex-col space-y-2">
          <Button onClick={clearRow}>Clear row</Button>
          <Button onClick={removeRow} disabled={data.rows.length < 2}>
            Remove row
          </Button>
        </section>
      </section>
    </Modal>
  );
}
