import { useDispatch, useSelector } from '../redux/hooks';
import { ADD_ROW, CHANGE_ROW_COLOR, CLEAR_ROW, REMOVE_ROW, RENAME_ROW } from '../redux/actions';
import ContentEditable from 'react-contenteditable';
import { Modal } from 'react-bootstrap'

type Props = {}

export default function SettingsModal({}: Props) {
  return (
    <div>SettingsModal</div>
  )
}