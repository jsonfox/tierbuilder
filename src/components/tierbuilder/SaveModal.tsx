import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button } from '../generic';
import { Close, Download, Success } from '../icons';
import Canvas from './Canvas';
import { StateAction, TbRow } from '../../utils/types';

interface Props {
  rows: TbRow[];
  isOpen: boolean;
  setIsOpen: StateAction;
}

export default function SaveModal({ rows, isOpen, setIsOpen }: Props) {
  const [isClosing, setIsClosing] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [timeoutId, setTimeoutId] = useState(0);

  const downloadImage = () => {
    const img = document.querySelector('canvas')?.toDataURL('image/png');
    if (!img) return;
    clearTimeout(timeoutId);

    const link = document.createElement('a');
    link.download = 'download.png';
    link.href = img;
    link.click();
    setDownloaded(true);
    setTimeoutId(
      window.setTimeout(() => {
        setDownloaded(false);
      }, 3000)
    );
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 100);
  };

  const btnIconProps = {
    size: 22,
    className: 'hidden md:block'
  };

  return (
    <Modal
      role="modal"
      className={`${
        isClosing ? 'out ' : ''
      }relative top-12 mx-auto flex max-w-fit flex-col items-center rounded-sm bg-white p-8`}
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
      <Button className="mb-4" onClick={() => downloadImage()}>
        Download Image
        {downloaded ? (
          <Success {...btnIconProps} />
        ) : (
          <Download {...btnIconProps} />
        )}
      </Button>
      <Canvas rows={rows} />
    </Modal>
  );
}
