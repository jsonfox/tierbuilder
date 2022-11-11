import RandExp from 'randexp';
import base64url from 'base64url';
import { StateProps, TbItem } from './types';
import { IMAGE_LIST, ROW_NAMES, COLORS } from './constants';

// Returns a new array excluding the first element of the provided array
export const tail = (array: any[]): any[] =>
  array.length > 1 ? array.slice(1) : [];

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
export const insert = (array: any[], index: number, item: any): any[] => {
  const arr = [...array];
  arr.splice(index, 0, item);
  return arr;
};

// Convert JSON to base64url encoded string;
export const jsonToBase64url = (json: Record<string, any>) =>
  base64url(JSON.stringify(json));

// Convert base64url encoded string to JSON
export const base64urlToJson = (str: string) =>
  JSON.parse(base64url.decode(str));

// Copy text to clipboard
export const updateClipboard = (str: string) => {
  return new Promise((res, rej) => {
    navigator.clipboard
      .writeText(str)
      .then(() => res('Copied'))
      .catch(rej);
  });
};

// Create copy of state to avoid state mutation
export const copyState = (state: StateProps) =>
  JSON.parse(JSON.stringify(state));

// Create TbItem from URL
export const createItem = (imageUrl: string): TbItem => ({
  key: new RandExp(/\w{5}/i).gen(),
  imageUrl
});

// Create tierbuilder state
export const createInitialState = (
  images: string[] = IMAGE_LIST,
  labels: string[] = ROW_NAMES
) => {
  const items = images.map(createItem);
  return {
    pool: items,
    rows: labels.map((name, i) => ({ name, color: COLORS[i], items: [] }))
  };
};

// Join multiple class name strinngs
export const classNames = (
  ...args: Array<string | string[] | object | undefined>
) => {
  const join = (arr: Array<string | undefined>) =>
    arr.filter((c) => c).join(' ') ?? '';

  const names = args.map((e) => {
    if (Array.isArray(e)) {
      return join(e);
    } else if (typeof e === 'object') {
      return Object.entries(e)
        .filter(([, v]) => v === true)
        .map(([k]) => k)
        .join(' ');
    } else {
      return e;
    }
  });

  return join(names);
};

// Add Tailwind selectors to class name strings
export const addSelectors = (toAdd: object) =>
  Object.entries(toAdd).map(
    ([selector, classes]) =>
      (classes as string)
        ?.split(' ')
        .map((c) => `${selector}:${c}`)
        .join(' ') ?? ''
  );

// Non-breaking space character generator
export const nbsp = (len = 1) =>
  Array.from(Array(len < 0 ? 0 : len), () => '\u00A0').join('') || '';
