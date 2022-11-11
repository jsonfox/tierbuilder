import {
  tail,
  reorder,
  insert,
  jsonToBase64url,
  base64urlToJson,
  createInitialState,
  copyState,
  classNames,
  addSelectors,
  nbsp
} from './helpers';
import { StateProps } from './types';

const createArray = (len = 3) => Array.from(Array(len), (v, i) => i);

describe('tail', () => {
  it('Returns an array excluding the first element', () => {
    const arr = createArray(3);
    expect(tail(arr).length).toBe(2);
  });

  it('Returns an empty array when given an array of less than 2 length', () => {
    const arr = createArray(1);
    expect(tail(arr).length).toBe(0);
    expect(tail([]).length).toBe(0);
  });
});

describe('reorder', () => {
  it('Moves an item to a specific index in an array', () => {
    const arr = createArray(5);
    const reordered = reorder(arr, 0, 4);
    expect(reordered.indexOf(0)).toBe(4);
    expect(reordered.indexOf(4)).toBe(3);
  });
});

describe('insert', () => {
  it('Returns an array with an inserted item', () => {
    const arr = createArray(5);
    const inserted = insert(arr, 0, 6);
    expect(inserted.length).toBe(6);
    expect(inserted.indexOf(6)).toBe(0);
  });
});

describe('json and base64 url conversion', () => {
  const decoded = { a: 1 };
  const encoded = 'eyJhIjoxfQ';

  it('Encodes json into a base64 string', () => {
    expect(jsonToBase64url(decoded)).toEqual(encoded);
  });

  it('Decodes a base64 string into json format', () => {
    expect(base64urlToJson(encoded)).toEqual(decoded);
  });
});

describe('createInitialState & copyState', () => {
  const state: StateProps = createInitialState();
  const copy: StateProps = copyState(state);

  it('Returns a new object identical to the given state', () => {
    expect(copy).toEqual(state);
  });

  it('Does not a reference to the same object', () => {
    expect(state === copy).toBe(false);
  });
});

describe('classNames', () => {
  it('Returns a single string joining multiple className strings with a space', () => {
    const joined = classNames('flex bg-black', 'flex-col', 'm-0');
    expect(joined).toBe('flex bg-black flex-col m-0');
  });

  it('Joins class names of objects containing boolean values', () => {
    const joined = classNames({ flex: true, 'bg-black': false });
    expect(joined).toMatch(/^flex$/);
  });

  it('Joins class names when given an array of strings', () => {
    const classes = ['flex', 'bg-black'];
    const joined = classNames(classes);
    expect(joined).toBe('flex bg-black');
  });

  it('Removes undefined args and empty strings', () => {
    let name;
    const joined = classNames('', 'flex', name, 'p-0');
    expect(joined).toBe('flex p-0');
  });

  it('Returns an empty string when not passed any values', () => {
    expect(classNames()).toBe('');
  });
});

describe('addSelectors', () => {
  it('Returns an array of class names with prepended Tailwind selectors', () => {
    const selectors = {
      hover: 'opacity-50',
      active: 'translate-y-px'
    };
    const added = addSelectors(selectors) as string[];
    expect(added.every((e) => /^(hover|active):/.test(e))).toBe(true);
  });
});

describe('nbsp', () => {
  it('Returns a string of repeated "\u00A0" equal given number', () => {
    const count = 5;
    const str = nbsp(count);
    expect(/\s{5}/.test(str)).toBe(true);
  });

  it('Returns an empty string when given a number less than or equal to 0', () => {
    const zero = nbsp(0);
    const lessThanZero = nbsp(-5);
    expect(zero).toBe('');
    expect(lessThanZero).toBe('');
  });
});
