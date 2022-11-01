import React from 'react';
import { AppDispatch } from '../redux/store';
// import { z } from "zod"

export type InputEvent = MouseEvent | TouchEvent | KeyboardEvent;
export type StateAction = React.Dispatch<React.SetStateAction<boolean>>;
export type DispatchAction = (...args: unknown[]) => AppDispatch;
export type AnyFunction = (...args: unknown[]) => unknown;
export type Ref = React.RefObject<unknown>;
export type Nodes = JSX.Element | JSX.Element[];
export type TbItem = { key: string; imageUrl: string };
export type TbRow = { name: string; color: string; items: TbItem[] };
export interface StateProps {
  items: {
    all: TbItem[];
    current: TbItem[];
  };
  rows: TbRow[];
}
export const initialState: StateProps = {
  items: {
    all: [],
    current: []
  },
  rows: []
};

// Schema validation
// export const EncodedSchema = z.object({

// })
