import { useDispatch, useSelector } from '../redux/hooks';
import { CLEAR_ALL_ROWS, MOVE_ITEM, RESET, SET_DATA } from '../redux/actions';
import { useEffect, useState } from 'react';
import {
  base64urlToJson,
  jsonToBase64url,
  updateClipboard
} from '../utils/helpers';
import {
  copyErrorText,
  copyStatusResetTimer,
  copySuccessText
} from '../utils/constants';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { DefaultArea, Row } from '../components/tierbuilder';
import className from 'classnames';
import { useParams, redirect } from 'react-router-dom';
import { createInitialState } from '../utils/helpers';
import { initialState, TbRow } from '../utils/types';

// Main tierbuilder component
function Tierbuilder() {
  const [copyStatus, setCopyStatus] = useState('');
  const dispatch = useDispatch();
  const data = useSelector((state) => state).tierbuilder || initialState;

  const onDragEnd = (dropInfo: DropResult) => {
    const { source, destination } = dropInfo;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    dispatch({ type: MOVE_ITEM, dropInfo });
  };

  const save = () => redirect(`/t/${jsonToBase64url(data)}`);

  const reset = () => {
    redirect('/builder');
    dispatch({ type: RESET });
  };

  const clearRows = () => dispatch({ type: CLEAR_ALL_ROWS });

  const copyToClipboard = () => {
    try {
      updateClipboard(jsonToBase64url(data)).then(() => {
        setCopyStatus(copySuccessText);
      });
    } catch {
      setCopyStatus(copyErrorText);
    }
  };

  useEffect(() => {
    if (copyStatus) {
      setTimeout(() => {
        setCopyStatus('');
      }, copyStatusResetTimer);
    }
  }, [copyStatus]);

  useEffect(() => {
    if (data.items.all.length < 1) {
      dispatch({ type: SET_DATA, data: createInitialState() });
    }
  }, [data, dispatch]);

  return (
    <div className="flex-col space-y-6 py-12">
      <div className="flex justify-center space-x-2">
        <button onClick={() => save()} className="btn">
          Save to URL
        </button>
        <button
          onClick={() => copyToClipboard()}
          className={className('btn', {
            'btn--green': copyStatus === copySuccessText,
            'btn--red': copyStatus === copyErrorText
          })}
        >
          {copyStatus ? copyStatus : 'Save to clipboard'}
        </button>
        <button onClick={() => reset()} className="btn">
          Reset
        </button>
        <button onClick={() => clearRows()} className="btn">
          Clear all rows
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container mx-auto max-w-6xl flex-col space-y-5">
          <div className="rows flex-col">
            {data.rows.map(({ name, color, items }: TbRow, i: number) => (
              <Row
                key={`row-${i}`}
                name={name}
                color={color}
                items={items}
                rowIndex={i}
                totalRows={data.rows.length}
              />
            ))}
          </div>
          <DefaultArea items={data.items.current} />
        </div>
      </DragDropContext>
    </div>
  );
}

function Wrapper() {
  // const { encoded } = useParams()
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   if (encoded && validateEncoded(encoded)) {
  //     dispatch({ type: SET_DATA, data: base64urlToJson(encoded) })
  //   }
  // }, [encoded, dispatch])
  return <Tierbuilder />;
}

export default Wrapper;
