import { useDispatch, useSelector } from "../redux/hooks";
import {
  CLEAR_ALL_ROWS,
  MOVE_ITEM,
  MOVE_ROW,
  RENAME_ROW,
  RESET,
  SET_DATA
} from '../redux/actions'
import { useEffect, useState } from 'react'
import {
  base64urlToJson,
  jsonToBase64url,
  tail,
  updateClipboard,
} from '../utils/helpers'
import {
  copyErrorText,
  copyStatusResetTimer,
  copySuccessText
} from '../utils/constants'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { DefaultArea, Row } from '../components'
import className from 'classnames'
import { useParams, redirect } from "react-router-dom";
import { createInitialState } from "../utils/helpers";

// Main tierbuilder component
function Tierbuilder() {
  const [copyStatus, setCopyStatus] = useState('')
  const dispatch = useDispatch()
  const data = useSelector(state => state).tierbuilder || []

  const onDragEnd = (dropInfo: DropResult) => {
    if (!dropInfo.destination) return
    console.log(dropInfo);
    dispatch({ type: MOVE_ITEM, dropInfo })
  }

  const moveRow = (rowIndex: number, direction: string) => {
    dispatch({ type: MOVE_ROW, rowIndex, direction })
  }

  const save = () => redirect(`/t/${jsonToBase64url(data)}`)
  const reset = () => {
    redirect('/builder')
    dispatch({ type: RESET })
  }
  const clearRows = () => dispatch({ type: CLEAR_ALL_ROWS })

  const copyToClipboard = () => {
    try {
      updateClipboard(jsonToBase64url(data)).then(() => {
        setCopyStatus(copySuccessText)
      })
    } catch {
      setCopyStatus(copyErrorText)
    }
  }

  useEffect(() => {
    if (copyStatus) {
      setTimeout(() => {
        setCopyStatus('')
      }, copyStatusResetTimer)
    }
  }, [copyStatus])

  useEffect(() => {
    if (data.length < 1) {
      dispatch({ type: SET_DATA, data: createInitialState() })
    }
  }, [data, dispatch])

  return (
    <>
      {data.length < 1 ? null : (
        <>
          <div className="controls">
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
            <div className="container">
              {tail(data).map(({ name, color, items }, i) => (
                <Row
                  key={`row-${i}`}
                  name={name}
                  color={color}
                  items={items}
                  moveRow={moveRow}
                  rowIndex={i + 1}
                  totalRows={tail(data).length}
                />
              ))}
            </div>
            <DefaultArea items={data[0].items} />
          </DragDropContext>
        </>
      )}
    </>
  )
}

function Wrapper() {
  // const { encoded } = useParams()
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   if (encoded && validateEncoded(encoded)) {
  //     dispatch({ type: SET_DATA, data: base64urlToJson(encoded) })
  //   }
  // }, [encoded, dispatch])
  return <Tierbuilder />
}

export default Wrapper