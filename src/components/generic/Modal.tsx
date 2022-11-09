import React from 'react';
import ReactModal from 'react-modal';
import { joinClassNames } from '../../utils/helpers';
import { Children } from '../../utils/types';

interface Props {
  children: Children;
  className: string;
  isOpen: boolean;
  isClosing: boolean;
  closeModal: () => void;
}

export default function Modal({
  className,
  isClosing,
  closeModal,
  ...props
}: Props) {
  return (
    <ReactModal
      role="modal"
      appElement={document.querySelector('#root') as HTMLElement}
      className={joinClassNames(isClosing ? 'out' : '', className)}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: '#00000066'
        }
      }}
      {...props}
    />
  );
}
