import base64url from 'base64url';
import { RootState } from '../redux/store';
import { TbRow, createItem, StateProps } from './types';
import { IMAGE_LIST } from './constants';

// Returns a new array excluding the first element of the provided array
export const tail = (array: any[]): any[] =>
  array.length > 1 ? array.slice(1, -1) : [];

// Returns a new copy of an array with an item moved from one index to another
export const reorder = (
  array: any[],
  fromIndex: number,
  toIndex: number
): any[] => {
  const arr = [...array];
  const [item] = arr.splice(fromIndex, 1);
  const insertIndex = toIndex - (fromIndex < toIndex ? 0 : 1);
  arr.splice(insertIndex, 0, item);
  return arr;
};

// Returns a new array with an item inserted at a specified index
export const insert = (array: any[], index: number, item: any): any[] =>
  [...array].splice(index, 0, item);

// Convert JSON to base64url encoded string;
export const jsonToBase64url = (json: Record<string, unknown>) => base64url(JSON.stringify(json));

// Convert base64url encoded string to JSON
export const base64urlToJson = (str: string) =>
  JSON.parse(base64url.decode(str));

// Copy text to clipboard
export const updateClipboard = (str: string) => {
  return new Promise((resolve, reject) => {
    navigator.clipboard.writeText(str).then(
      () => {
        resolve('Success');
      },
      () => {
        reject('Error');
      }
    );
  });
};

// Create copy of state to avoid state mutation
export const copyState = (state: StateProps) => JSON.parse(JSON.stringify(state))

export const createInitialState = () => {
  const items = IMAGE_LIST.map(createItem)
  return {
    items: {
      all: items,
      current: items
    },
    rows: [
      { name: 'A', color: 'green', items: [] },
      { name: 'B', color: 'lightgreen', items: [] },
      { name: 'C', color: 'yellow', items: [] },
      { name: 'D', color: 'orange', items: [] },
      { name: 'F', color: 'red', items: [] }
    ]
  };
};
