import { useState, useCallback } from 'react';

export type ModalType = 'add' | 'edit' | 'delete' | null;

export interface ModalData {
  warehouseId?: string | number;
  warehouseName?: string;
  initialText?: string;
}

interface EditModalData extends ModalData {
  warehouseId: string | number;
  initialText: string;
}

interface DeleteModalData extends ModalData {
  warehouseId: string | number;
  warehouseName: string;
}

export interface ModalState {
  type: ModalType;
  data?: ModalData | EditModalData | DeleteModalData;
}

export const useWarehouseModal = () => {
  const [modalState, setModalState] = useState<ModalState>({ type: null, data: {} });
  const [text, setText] = useState<string>('');

  const isModalOpen = modalState.type !== null;

  const openModal = useCallback((type: ModalType, data?: ModalData) => {
    setModalState({ type, data });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ type: null, data: {} });
    setText('');
  }, []);

  const openAddModal = useCallback(() => openModal('add'), [openModal]);

  const openEditModal = useCallback(
    (id: string | number, name: string) => {
      setText(name);
      openModal('edit', { warehouseId: id, initialText: name });
    },
    [openModal],
  );

  const openDeleteModal = useCallback(
    (id: string | number, name: string) => {
      openModal('delete', { warehouseId: id, warehouseName: name });
    },
    [openModal],
  );

  return {
    modalState,
    text,
    setText,
    isModalOpen,
    openAddModal,
    openEditModal,
    openDeleteModal,
    closeModal,
  };
};
