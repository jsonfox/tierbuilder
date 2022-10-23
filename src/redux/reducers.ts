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
import { insert, reorder, copyState, tail } from '../utils/helpers';
import { TbRow, StateProps, initialState } from '../utils/types';
import { AnyAction } from 'redux';

const actions = {
  RESET: () => initialState,
  SET_DATA: ({ data }: { data: TbRow[] }) => data,
  // TODO: Fix stuttering on moving within same row likely caused by performance
  MOVE_ITEM: (state: StateProps, { dropInfo }: AnyAction) => {
    const rows = [[...state.items.current], ...state.rows.map((r) => r.items)];
    const { destination, source } = dropInfo;
    const [fromRow, toRow] = [source.droppableId, destination.droppableId].map(
      (id) => (/default/i.test(id) ? 0 : parseInt(id) + 1)
    );
    const fromIndex = source.index;
    let toIndex = destination.index;

    if (fromRow === toRow) {
      if (toIndex < fromIndex) toIndex++;
      rows[toRow] = reorder([...rows[toRow]], fromIndex, toIndex);
    } else {
      const [toMove] = rows[fromRow].splice(fromIndex, 1);
      rows[toRow].splice(toIndex, 0, toMove);
    }

    state.items.current = rows[0];
    tail(rows).forEach((row, i) => (state.rows[i].items = row));

    return state;
  },
  ADD_ROW: (state: StateProps, { direction, rowIndex }: AnyAction) => {
    const newRow = { name: 'New Row', color: 'grey', items: [] };
    const insertIndex = direction === 'above' ? rowIndex : rowIndex + 1;
    return {
      ...state,
      rows: insert(state.rows, insertIndex, newRow)
    };
  },
  MOVE_ROW: (state: StateProps, { direction, rowIndex }: AnyAction) => {
    const { rows } = state;
    if (
      (rowIndex < 1 && direction === 'up') ||
      (rowIndex === rows.length - 1 && direction === 'down')
    )
      return;
    const newRowIndex = rowIndex + (direction === 'up' ? 0 : 1);
    return {
      ...state,
      rows: reorder(rows, rowIndex, newRowIndex)
    };
  },
  REMOVE_ROW: (state: StateProps, { rowIndex }: AnyAction) => {
    const { items, rows } = state;
    state.items.current = [...items.current].concat(rows[rowIndex].items);
    state.rows.splice(rowIndex, 1);
    return state;
  },
  CLEAR_ROW: (state: StateProps, { rowIndex }: AnyAction) => {
    const { items, rows } = state;
    state.items.current = [...items.current].concat(rows[rowIndex].items);
    state.rows[rowIndex].items = [];
    return state;
  },
  CLEAR_ALL_ROWS: (state: StateProps) => {
    state.rows = state.rows.map((row) => ({ ...row, items: [] }));
    state.items.current = state.items.all;
    return state;
  },
  RENAME_ROW: (state: StateProps, { rowIndex, name }: AnyAction) => {
    state.rows[rowIndex].name = name.toString();
    return state;
  },
  CHANGE_ROW_COLOR: (state: StateProps, { rowIndex, color }: AnyAction) => {
    state.rows[rowIndex].color = color.toString();
    return state;
  }
};

export const tierbuilder = (
  state: StateProps = initialState,
  action: AnyAction
) => {
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
