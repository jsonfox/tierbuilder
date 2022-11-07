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
import { StateProps, initialState } from '../utils/types';
import { AnyAction } from 'redux';

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

    case MOVE_ITEM: {
      const { dropInfo } = action;
      const rows = [[...state.pool], ...state.rows.map((r) => r.items)];
      const { destination, source } = dropInfo;
      const [fromRow, toRow] = [
        source.droppableId,
        destination.droppableId
      ].map((id) => (/pool/i.test(id) ? 0 : parseInt(id) + 1));
      const fromIndex = source.index;
      let toIndex = destination.index;

      if (fromRow === toRow) {
        if (toIndex < fromIndex) toIndex++;
        rows[toRow] = reorder([...rows[toRow]], fromIndex, toIndex);
      } else {
        const [toMove] = rows[fromRow].splice(fromIndex, 1);
        rows[toRow].splice(toIndex, 0, toMove);
      }

      state.pool = rows[0];
      tail(rows).forEach((row, i) => (state.rows[i].items = row));

      return state;
    }

    case ADD_ROW: {
      const { rowIndex, direction } = action;
      const newRow = { name: 'NEW', color: '#FFFF7F', items: [] };
      const insertIndex = direction === 'above' ? rowIndex : rowIndex + 1;
      console.log(state.rows, insert(state.rows, insertIndex, newRow));
      return {
        ...state,
        rows: insert(state.rows, insertIndex, newRow)
      };
    }

    case MOVE_ROW: {
      const { rowIndex, direction } = action;
      if (
        (rowIndex < 1 && direction === 'up') ||
        (rowIndex === state.rows.length - 1 && direction === 'down')
      )
        return;
      const newRowIndex = rowIndex + (direction === 'up' ? 0 : 1);
      return {
        ...state,
        rows: reorder(state.rows, rowIndex, newRowIndex)
      };
    }

    case REMOVE_ROW:
    case CLEAR_ROW: {
      const { rowIndex } = action;
      state.pool.push(...state.rows[rowIndex].items);

      if (action.type === CLEAR_ROW) {
        state.rows[rowIndex].items = [];
      } else {
        state.rows.splice(rowIndex, 1);
      }

      return state;
    }

    case CLEAR_ALL_ROWS: {
      state.rows = state.rows.map((row) => {
        state.pool.push(...row.items);
        return { ...row, items: [] };
      });
      return state;
    }

    case RENAME_ROW: {
      const { rowIndex, name } = action;
      state.rows[rowIndex].name = name.toString();
      return state;
    }

    case CHANGE_ROW_COLOR: {
      const { rowIndex, color } = action;
      state.rows[rowIndex].color = color.toString();
      return state;
    }

    default:
      return state;
  }
};
