import { object, string, arrayOf } from 'checkeasy';
import React from 'react';
import { AppDispatch } from '../redux/store';

export type InputEvent = MouseEvent | TouchEvent | KeyboardEvent;
export type UploadEvent = React.ChangeEvent | DragEvent;
export type StateAction = React.Dispatch<React.SetStateAction<any>>;
export type DispatchAction = (...args: unknown[]) => AppDispatch;
export type AnyFunction = (...args: unknown[]) => unknown;
export type Ref = React.RefObject<unknown>;
export type Children = JSX.Element | JSX.Element[] | string;
export type TbItem = { key: string; imageUrl: string };
export type TbRow = { name: string; color: string; items: TbItem[] };

export interface StateProps {
  pool: TbItem[];
  rows: TbRow[];
}

export const initialState: StateProps = {
  pool: [],
  rows: []
};

// Encoded url validators
const itemValidator = object({
  key: string(),
  imageUrl: string()
});

const rowValidator = object({
  name: string(),
  color: string(),
  items: arrayOf(itemValidator)
});

export const encodedValidator = object({
  pool: arrayOf(itemValidator),
  rows: arrayOf(rowValidator)
});
