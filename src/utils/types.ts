import RandExp from 'randexp';
import React from 'react';
import { AppDispatch } from '../redux/store';
// import { z } from "zod"

export type InputEvent = MouseEvent | TouchEvent | KeyboardEvent;
export type StateAction = React.Dispatch<React.SetStateAction<boolean>>;
export type DispatchAction = (...args: any[]) => AppDispatch;
export type AnyFunction = (...args: any[]) => any;
export type Ref = React.RefObject<any>;
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
export const createItem = (imageUrl: string): TbItem => ({
  key: new RandExp(/\w{5}/i).gen(),
  imageUrl
});

// Schema validation
// export const EncodedSchema = z.object({

// })
