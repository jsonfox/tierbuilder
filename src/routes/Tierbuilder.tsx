import { useDispatch, useSelector } from '../redux/hooks';
import { CLEAR_ALL_ROWS, MOVE_ITEM, RESET, SET_DATA } from '../redux/actions';
import { useEffect, useState } from 'react';
import {
  base64urlToJson,
  jsonToBase64url,
  updateClipboard
} from '../utils/helpers';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { DefaultArea, Row } from '../components/tierbuilder';
import { useParams, useNavigate } from 'react-router-dom';
import { createInitialState } from '../utils/helpers';
import { initialState, TbRow, encodedValidator } from '../utils/types';

// Main tierbuilder component
function Tierbuilder() {
  const [copyStatus, setCopyStatus] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state).tierbuilder ?? initialState;

  const onDragEnd = (dropInfo: DropResult) => {
    const { source, destination } = dropInfo;
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    )
      return;

    dispatch({ type: MOVE_ITEM, dropInfo });
  };

  const save = () => {
    navigate(`/builder/${jsonToBase64url(data)}`);
  };

  const reset = () => {
    dispatch({ type: RESET });
    navigate('/builder');
  };

  const clearRows = () => dispatch({ type: CLEAR_ALL_ROWS });

  const copyToClipboard = () => {
    updateClipboard(jsonToBase64url(data))
      .then(() => setCopyStatus('Copied to clipboard'))
      .catch((err) => {
        console.error(err);
        setCopyStatus('Failed to copy');
      });
    setTimeout(() => {
      setCopyStatus('');
    }, 3000);
  };

  useEffect(() => {
    if (data.pool.length < 1) {
      dispatch({ type: SET_DATA, data: createInitialState() });
    }
  }, [data, dispatch]);

  return (
    <div className="flex-col space-y-6 py-12">
      <div className="flex justify-center space-x-2">
        <button onClick={() => save()}>Save to URL</button>
        <button onClick={() => copyToClipboard()}>
          {copyStatus || 'Save to clipboard'}
        </button>
        <button onClick={() => reset()}>Reset</button>
        <button onClick={() => clearRows()}>Clear all rows</button>
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
          <DefaultArea items={data.pool} />
        </div>
      </DragDropContext>
    </div>
  );
}

function Wrapper() {
  const { encoded } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (encoded) {
      try {
        const data = base64urlToJson(encoded);
        encodedValidator(data, 'encoded');
        dispatch({ type: SET_DATA, data });
      } catch {
        console.log('URL was not valid');
        navigate('/builder');
      }
    }
  }, [encoded, dispatch]);

  return <Tierbuilder />;
}

export default Wrapper;
