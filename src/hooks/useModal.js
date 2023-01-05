import { useState } from 'react';

export const useModal = () => {
  const [isOpenModal, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return { isOpenModal, openModal, closeModal };
};
