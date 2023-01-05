import PropType from 'prop-types';
import React from 'react';
import AppModal from 'react-modal';

const Modal = ({
  isOpen,
  onRequestClose,
  afterOpenModal,
  overrideStyle,
  children
}) => {
  const defaultStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      position: 'fixed',
      padding: '50px 20px',
      transition: 'all .5s ease',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 5px 10px rgba(0, 0, 0, .1)',
      animation: 'scale .3s ease',
      ...overrideStyle
    },
    overlay: {
        zIndex: 80
    }
  };

  AppModal.setAppElement('#root');

  return (
    <AppModal
      closeTimeoutMS={300}
      contentLabel="Product Modal"
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick
      style={defaultStyle}
    >
      {children}
    </AppModal>
  );
};

export default Modal