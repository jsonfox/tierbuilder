import {
  ADD_ROW,
  CHANGE_ROW_COLOR,
  CLEAR_ALL_ROWS,
  CLEAR_ROW,
  MOVE_ITEM,
  MOVE_ROW,
  REMOVE_ROW,
  RENAME_ROW,
  SET_DATA
} from './actions';
import { tierbuilder as reducer } from './reducers';
import { StateProps, TbRow } from '../utils/types';

let init: StateProps;

const createItems = (len = 5) =>
  Array.from(Array(len), (v, i) => ({ key: `${i}`, imageUrl: `${i}` }));

const createRows = (len = 3) =>
  Array.from(
    Array(len),
    (v, i): TbRow => ({ name: `${i}`, color: `${i}`, items: [] })
  );

beforeEach(async () => {
  init = {
    pool: createItems(),
    rows: createRows()
  };
});

describe('Invalid reducer action', () => {
  it('Should return initial state', () => {
    expect(reducer(init, { type: 'none' })).toEqual(init);
  });
});

describe('SET_DATA reducer action', () => {
  it('Should return the provided state', () => {
    const expected: StateProps = {
      pool: [],
      rows: []
    };

    expect(reducer(init, { type: SET_DATA, data: expected })).toEqual(expected);
  });

  it('Should return example state when no data is provided', () => {
    const created = reducer(undefined, { type: SET_DATA });
    expect(created.pool.length).toBe(15);
    expect(created.rows.length).toBe(5);
  });
});

describe('MOVE_ITEM reducer action', () => {
  it('Should move an item to a different position in the same row', () => {
    const dropInfo = {
      source: {
        droppableId: 'pool',
        index: 0
      },
      destination: {
        droppableId: 'pool',
        index: 4
      }
    };

    const reordered = reducer(init, { type: MOVE_ITEM, dropInfo });
    expect(reordered?.pool.findIndex((e) => e.key === '0')).toBe(4);
  });

  it('Should move an item to a different row', () => {
    const dropInfo = {
      source: {
        droppableId: 'pool',
        index: 0
      },
      destination: {
        droppableId: '0',
        index: 0
      }
    };

    const reordered = reducer(init, { type: MOVE_ITEM, dropInfo });
    expect(reordered.rows[0].items[0].key).toBe('0');
  });
});

describe('ADD_ROW reducer action', () => {
  it('Should add a new row to the array of rows', () => {
    const withAddedRow = reducer(init, { type: ADD_ROW, direction: 'above' });
    expect(withAddedRow.rows.length).toBe(4);
  });
});

describe('MOVE_ROW reducer action', () => {
  it('Should move a row to a different position', () => {
    const moveRow = {
      type: MOVE_ROW,
      rowIndex: 0,
      direction: 'down'
    };

    const withMovedRow = reducer(init, moveRow);
    expect(withMovedRow).not.toEqual(init);
  });

  it('Should not move the first row up or the last row down', () => {
    const moveUp = {
      type: MOVE_ROW,
      rowIndex: 0,
      direction: 'up'
    };

    const afterMoveUp = reducer(init, moveUp);
    expect(afterMoveUp).toEqual(init);

    const moveDown = {
      type: MOVE_ROW,
      rowIndex: init.rows.length - 1,
      direction: 'down'
    };

    const afterMoveDown = reducer(init, moveDown);
    expect(afterMoveDown).toEqual(init);
  });
});

describe('REMOVE_ROW reducer action', () => {
  const removeRow = { type: REMOVE_ROW, rowIndex: 0 };

  it('Should remove a row', () => {
    const withRemovedRow = reducer(init, removeRow);
    expect(withRemovedRow.rows.length).toBe(2);
  });

  it('Should not remove the only row', () => {
    init.rows.length = 1;
    expect(init.rows.length).toBe(1);

    const afterRemoveRow = reducer(init, removeRow);
    expect(afterRemoveRow.rows.length).toBe(1);
  });
});

describe('CLEAR_ROW reducer action', () => {
  const clearRow = { type: CLEAR_ROW, rowIndex: 0 };

  it('Should remove all items from a row and add them to the pool', () => {
    init.rows[0].items = createItems(3);
    expect(init.rows[0].items.length).toBe(3);

    const withClearedRow = reducer(init, clearRow);
    expect(withClearedRow.rows[0].items.length).toBe(0);
    expect(withClearedRow.pool.length).toBe(8);
  });

  it('Should return the same state for an empty row', () => {
    const afterClearRow = reducer(init, clearRow);
    expect(afterClearRow).toEqual(init);
  });
});

describe('CLEAR_ALL_ROWS reducer action', () => {
  it('Should empty the items from all rows and add them to the pool', () => {
    const numItems = 3;

    init.rows = init.rows.map((r) => ({ ...r, items: createItems(numItems) }));
    expect(init.rows.every((r) => r.items.length === 3)).toBe(true);

    const expected = init.pool.length + init.rows.length * numItems;
    const withClearedRows = reducer(init, { type: CLEAR_ALL_ROWS });
    expect(withClearedRows.rows.every((r) => r.items.length === 0)).toBe(true);
    expect(withClearedRows.pool.length).toEqual(expected);
  });

  it('Should return the same state when all rows are empty', () => {
    const afterClearAllRows = reducer(init, { type: CLEAR_ALL_ROWS });
    expect(afterClearAllRows).toEqual(init);
  });
});

describe('RENAME_ROW reducer action', () => {
  it('Should contain a row with the new name', () => {
    const renameRow = {
      type: RENAME_ROW,
      rowIndex: 0,
      name: 'renamed'
    };

    expect(init.rows.some((r) => r.name === 'renamed')).toBe(false);
    const withRenamedRow = reducer(init, renameRow);
    expect(withRenamedRow.rows[0].name).toBe('renamed');
  });
});

describe('CHANGE_ROW_COLOR reducer action', () => {
  it('Should contain a row with the new color', () => {
    const changeRowColor = {
      type: CHANGE_ROW_COLOR,
      rowIndex: 0,
      color: 'black'
    };

    expect(init.rows.some((r) => r.color === 'black')).toBe(false);
    const withChangedRowColor = reducer(init, changeRowColor);
    expect(withChangedRowColor.rows[0].color).toBe('black');
  });
});
