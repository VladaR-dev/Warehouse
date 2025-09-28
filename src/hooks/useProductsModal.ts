import { useCallback } from 'react';
import { BaseModalData, useModal } from './useModal';

export const useProductsModal = () => {
  const { modalState, text, setText, isModalOpen, openModal, closeModal, quantity, setQuantity } =
    useModal<BaseModalData>();

  const openAddModal = useCallback(() => openModal('add'), [openModal]);

  const openDeleteModal = useCallback(
    (id: string | number, name: string) => {
      openModal('delete', { id, name });
    },
    [openModal],
  );

  return {
    modalState,
    text,
    setText,
    isModalOpen,
    openAddModal,
    openDeleteModal,
    closeModal,
    quantity,
    setQuantity,
  };
};
