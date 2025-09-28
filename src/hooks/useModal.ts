import { useCallback, useState } from 'react';

export type ModalType = 'add' | 'edit' | 'delete' | null;

export interface BaseModalData {
  id?: string | number;
  name?: string;
  initialText?: string;
  quantity?: number;
}

export interface ModalState<T extends BaseModalData = BaseModalData> {
  type: ModalType;
  data?: T;
}

export const useModal = <T extends BaseModalData = BaseModalData>() => {
  const [modalState, setModalState] = useState<ModalState<T>>({ type: null });
  const [text, setText] = useState<string>('');
  const [quantity, setQuantity] = useState<number | null>(null);

  const isModalOpen = modalState.type !== null;

  const openModal = useCallback((type: ModalType, data?: T) => {
    setModalState({ type, data });
    setQuantity(null);
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ type: null });
    setText('');
    setQuantity(null);
  }, []);
  return {
    modalState,
    text,
    setText,
    quantity,
    setQuantity,
    isModalOpen,
    openModal,
    closeModal,
  };
};
