import {
  ADD_ROW,
  CHANGE_ROW_COLOR,
  CLEAR_ALL_ROWS,
  CLEAR_ROW,
  MOVE_ITEM,
  MOVE_ROW,
  REMOVE_ROW,
  RENAME_ROW,
  RESET,
  SET_DATA
} from './actions';
import { insert, reorder, copyState } from '../utils/helpers';
import { TbRow } from '../utils/types';
import { DropResult } from 'react-beautiful-dnd';

const initialState: TbRow[] = [];

interface RowAction {
  rowIndex: number;
}

interface MoveRowAction extends RowAction {
  direction: string;
}

interface NameRowAction extends RowAction {
  name: string;
}

interface ColorRowAction extends RowAction {
  color: string;
}

const actions = {
  RESET: () => initialState,
  SET_DATA: ({ data }: { data: TbRow[] }) => data,
  MOVE_ITEM: (state: TbRow[], { dropInfo }: { dropInfo: DropResult }) => {
    const { destination, source } = dropInfo;
    let [fromRow, toRow] = [
      parseInt(source.droppableId),
      parseInt(destination!.droppableId)
    ];
    if (toRow < fromRow) toRow++;
    let [fromIndex, toIndex] = [source.index, destination!.index];
    if (toIndex < fromIndex) toIndex++;
    const [fromItems, toItems] = [
      [...state[fromRow].items],
      [...state[toRow].items]
    ];
    if (fromRow !== toRow) {
      const [itemToMove] = fromItems.splice(fromIndex, 1);
      toItems.splice(toIndex, 0, itemToMove);
      state[fromRow].items = fromItems;
      state[toRow].items = toItems;
    } else {
      state[toRow].items = reorder(state[toRow].items, fromIndex, toIndex);
    }
    return state;
  },
  ADD_ROW: (state: TbRow[], { direction, rowIndex }: MoveRowAction) => {
    const newRow = { name: 'New Row', color: 'grey', items: [] };
    const insertIndex = direction === 'above' ? rowIndex : rowIndex + 1;
    return insert(state, insertIndex, newRow);
  },
  MOVE_ROW: (state: TbRow[], { direction, rowIndex }: MoveRowAction) => {
    if (
      rowIndex < 1 ||
      (rowIndex < 2 && direction === 'up') ||
      (rowIndex === state.length - 1 && direction === 'down')
    )
      return;
    const newRowIndex = rowIndex + (direction === 'up' ? 0 : 1);
    return reorder(state, rowIndex, newRowIndex);
  },
  REMOVE_ROW: (state: TbRow[], { rowIndex }: RowAction) => {
    state[0].items = [...state[0].items].concat(state[rowIndex].items);
    state.splice(rowIndex, 1);
    return state;
  },
  CLEAR_ROW: (state: TbRow[], { rowIndex }: RowAction) => {
    state[0].items = [...state[0].items].concat(state[rowIndex].items);
    state[rowIndex].items = [];
    return state;
  },
  CLEAR_ALL_ROWS: (state: TbRow[]) => {
    state.forEach((row, i) => {
      if (i === 0) return;
      state[0].items = [...state[0].items].concat(row.items);
    });
  },
  RENAME_ROW: (state: TbRow[], { rowIndex, name }: NameRowAction) => {
    state[rowIndex].name = name;
    return state;
  },
  CHANGE_ROW_COLOR: (state: TbRow[], { rowIndex, color }: ColorRowAction) => {
    state[rowIndex].color = color;
    return state;
  }
};

export const tierbuilder = (state: TbRow[] = initialState, action: any) => {
  if (!action) return;
  state = copyState(state);
  switch (action.type) {
    case RESET:
      return initialState;
    case SET_DATA:
      return action.data;
    case MOVE_ITEM:
      return actions[MOVE_ITEM](state, action);
    case ADD_ROW:
      return actions[ADD_ROW](state, action);
    case MOVE_ROW:
      return actions[MOVE_ROW](state, action);
    case REMOVE_ROW:
      return actions[REMOVE_ROW](state, action);
    case CLEAR_ROW:
      return actions[CLEAR_ROW](state, action);
    case CLEAR_ALL_ROWS:
      return actions[CLEAR_ALL_ROWS](state);
    case RENAME_ROW:
      return actions[RENAME_ROW](state, action);
    case CHANGE_ROW_COLOR:
      return actions[CHANGE_ROW_COLOR](state, action);
    default:
      return state;
  }
};
