import Modal from 'react-modal';
import { Close } from '../icons';
import Canvas from './Canvas';
import { StateAction, TbRow } from '../../utils/types';

interface Props {
  rows: TbRow[];
  isOpen: boolean;
  setIsOpen: StateAction;
}

export default function SaveModal({ rows, isOpen, setIsOpen }: Props) {
  const closeModal = () => setIsOpen(false);

  const downloadImage = () => {
    const img = document.querySelector('canvas')?.toDataURL('image/png');
    if (!img) return;

    const link = document.createElement('a');
    link.download = 'download.png';
    link.href = img;
    link.click();
  };

  return (
    <Modal
      className="relative top-12 mx-auto flex max-w-fit flex-col items-center rounded-sm bg-white p-8"
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: '#00000066'
        }
      }}
      onRequestClose={closeModal}
    >
      <Close
        className="absolute top-0 right-0 mr-1 cursor-pointer opacity-30 hover:scale-110 hover:opacity-60"
        size={30}
        onClick={closeModal}
      />
      <button className="mb-4" onClick={() => downloadImage()}>
        Download Image
      </button>
      <Canvas rows={rows} />
    </Modal>
  );
}
