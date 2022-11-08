import {
  tail,
  reorder,
  insert,
  jsonToBase64url,
  base64urlToJson,
  createInitialState,
  copyState,
  joinClassNames,
  nbsp
} from './helpers';
import { StateProps } from './types';

const createArray = (len = 3) => Array.from(Array(len), (v, i) => i);

describe('tail', () => {
  it('Should return an array excluding the first element', () => {
    const arr = createArray(3);
    expect(tail(arr).length).toBe(2);
  });

  it('Should return an empty array when given an array of less than 2 length', () => {
    const arr = createArray(1);
    expect(tail(arr).length).toBe(0);
    expect(tail([]).length).toBe(0);
  });
});

describe('reorder', () => {
  it('Should move an item to a specific index', () => {
    const arr = createArray(5);
    const reordered = reorder(arr, 0, 4);
    expect(reordered.indexOf(0)).toBe(4);
    expect(reordered.indexOf(4)).toBe(3);
  });
});

describe('insert', () => {
  it('Should insert a new item into an array', () => {
    const arr = createArray(5);
    const inserted = insert(arr, 0, 6);
    expect(inserted.length).toBe(6);
    expect(inserted.indexOf(6)).toBe(0);
  });
});

describe('json and base64 url conversion', () => {
  const decoded = { a: 1 };
  const encoded = 'eyJhIjoxfQ';

  it('Should encode json into a base64 string', () => {
    expect(jsonToBase64url(decoded)).toEqual(encoded);
  });

  it('Should decode a base64 string into json format', () => {
    expect(base64urlToJson(encoded)).toEqual(decoded);
  });
});

describe('createInitialState & copyState', () => {
  const state: StateProps = createInitialState();
  const copy: StateProps = copyState(state);

  it('Should return a new object identical to the given state', () => {
    expect(copy).toEqual(state);
  });

  it('Should not return a reference to the same object', () => {
    expect(state === copy).toBe(false);
  });
});

describe('joinClassNames', () => {
  it('Should return a single string joining multiple className strings with a space', () => {
    const joined = joinClassNames('flex bg-black', 'flex-col', 'm-0');
    expect(joined).toBe('flex bg-black flex-col m-0');
  });

  it('Should remove undefined args and empty strings', () => {
    let name;
    const joined = joinClassNames('', 'flex', name, 'p-0');
    expect(joined).toBe('flex p-0');
  });

  it('Should return an empty string when not passed any values', () => {
    expect(joinClassNames()).toBe('');
  });
});

describe('nbsp', () => {
  it('Should return a string of repeated "\u00A0" equal given number', () => {
    const count = 5;
    const str = nbsp(count);
    expect(/\s{5}/.test(str)).toBe(true);
  });

  it('Should return an empty string when given a number less than or equal to 0', () => {
    const zero = nbsp(0);
    const lessThanZero = nbsp(-5);
    expect(zero).toBe('');
    expect(lessThanZero).toBe('');
  });
});
