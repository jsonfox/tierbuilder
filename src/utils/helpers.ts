import RandExp from 'randexp';
import base64url from 'base64url';
import { StateProps, TbItem } from './types';
import { IMAGE_LIST } from './constants';

// Returns a new array excluding the first element of the provided array
export const tail = (array: unknown[]): unknown[] =>
  array.length > 1 ? array.slice(1) : [];

// Returns a new copy of an array with an item moved from one index to another
export const reorder = (
  array: unknown[],
  fromIndex: number,
  toIndex: number
): unknown[] => {
  const arr = [...array];
  const [item] = arr.splice(fromIndex, 1);
  const insertIndex = toIndex - (fromIndex < toIndex ? 0 : 1);
  arr.splice(insertIndex, 0, item);
  return arr;
};

// Returns a new array with an item inserted at a specified index
export const insert = (array: unknown[], index: number, item: unknown): unknown[] =>
  [...array].splice(index, 0, item);

// Convert JSON to base64url encoded string;
export const jsonToBase64url = (json: Record<string, unknown>) =>
  base64url(JSON.stringify(json));

// Convert base64url encoded string to JSON
export const base64urlToJson = (str: string) =>
  JSON.parse(base64url.decode(str));

// Copy text to clipboard
export const updateClipboard = (str: string) => {
  return new Promise((res, rej) => {
    navigator.clipboard.writeText(str)
      .then(() => res('Copied'))
      .catch(rej)
  });
};

// Create copy of state to avoid state mutation
export const copyState = (state: StateProps) =>
  JSON.parse(JSON.stringify(state));

export const createItem = (imageUrl: string): TbItem => ({
  key: new RandExp(/\w{5}/i).gen(),
  imageUrl
});

// Create example tierbuilder   
export const createInitialState = () => {
  const items = IMAGE_LIST.map(createItem);
  return {
    items: {
      all: items,
      current: items
    },
    rows: [
      { name: 'A', color: '#FF7F7F', items: [] },
      { name: 'B', color: '#FFBF7F', items: [] },
      { name: 'C', color: '#FFDF7F', items: [] },
      { name: 'D', color: '#FFFF7F', items: [] },
      { name: 'F', color: '#BFFF7F', items: [] }
    ]
  };
};
