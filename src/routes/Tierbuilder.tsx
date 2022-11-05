import { useDispatch, useSelector } from '../redux/hooks';
import { CLEAR_ALL_ROWS, MOVE_ITEM, SET_DATA } from '../redux/actions';
import { useEffect, useState } from 'react';
import {
  base64urlToJson,
  jsonToBase64url,
  updateClipboard
} from '../utils/helpers';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { DefaultArea, SaveModal, Row } from '../components/tierbuilder';
import { useParams, useNavigate } from 'react-router-dom';
import { createInitialState } from '../utils/helpers';
import { initialState, TbRow, encodedValidator } from '../utils/types';
import { Button } from '../components/generic';
import { ClearAll, Copied, Copy, Save } from '../components/icons';

// Main tierbuilder component
function Tierbuilder() {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeoutId, setTimeoutId] = useState(0);
  const dispatch = useDispatch();
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

  const clearRows = () => dispatch({ type: CLEAR_ALL_ROWS });

  const copyToClipboard = () => {
    clearTimeout(timeoutId);
    updateClipboard(
      `${window.location.origin}/builder/${jsonToBase64url(data)}`
    )
      .then(() => setCopied(true))
      .catch((err) => {
        console.error(err);
        setCopied(false);
      });
    setTimeoutId(
      window.setTimeout(() => {
        setCopied(false);
      }, 3000)
    );
  };

  useEffect(() => {
    if (data.rows.length < 1) {
      dispatch({ type: SET_DATA, data: createInitialState() });
    }
  }, [data, dispatch]);

  return (
    <div className="flex-col space-y-6 py-12">
      <div className="flex justify-center space-x-2">
        <Button aria-label="Copy as URL" onClick={() => copyToClipboard()}>
          {copied
            ? 'Copied\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'
            : 'Copy As URL'}
          {copied ? <Copied size={22} /> : <Copy size={22} />}
        </Button>
        <Button aria-label="Clear all rows" onClick={() => clearRows()}>
          Clear All Rows
          <ClearAll size={22} />
        </Button>
        <Button aria-label="Save image" onClick={() => setShowModal(true)}>
          Save Image
          <Save size={22} />
        </Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container mx-auto max-w-6xl flex-col space-y-5">
          <div className="rows flex-col space-y-[1px]">
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

      {showModal && (
        <SaveModal
          rows={data.rows}
          isOpen={showModal}
          setIsOpen={setShowModal}
        />
      )}
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
