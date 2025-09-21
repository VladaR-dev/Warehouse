import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Typography, TextField, Pagination, Box } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

import {
  addWarehouse,
  removeWarehouse,
  Warehouse,
  editWarehouse,
} from '../../redux/slices/warehouseSlice';
import { setPage, setTotalItems } from '../../redux/slices/paginationSlice';
import { CustomButton, Modal } from '../../components';
import { RootState } from '../../redux/store';
import s from './Warehouses.module.scss';

export const Warehouses: React.FC = () => {
  type ModalType = 'add' | 'edit' | 'delete' | null;

  interface ModalData {
    warehouseId?: string | number;
    warehouseName?: string;
    initialText?: string;
  }
  interface ModalState {
    type: ModalType;
    data?: ModalData;
  }

  const warehouses = useSelector((state: RootState) => state.warehouse);
  const pagination = useSelector((state: RootState) => state.pagination);
  const dispatch = useDispatch();

  const [modalState, setModalState] = useState<ModalState>({
    type: null,
    data: {},
  });

  const [text, setText] = useState<string>('');

  const isModalOpen = modalState.type !== null;

  const displayedItems = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return warehouses.items.slice(startIndex, endIndex);
  }, [warehouses.items, pagination.currentPage, pagination.itemsPerPage]);

  useEffect(() => {
    dispatch(setTotalItems(warehouses.items.length));
  }, [dispatch, warehouses.items.length]);

  const searchDuplicate = useCallback(() => {
    return warehouses.items.some(
      ({ name }) => name.trim().toLowerCase() === text.trim().toLowerCase(),
    );
  }, [text, warehouses.items]);

  const openModal = useCallback((type: ModalType, data?: ModalState['data']) => {
    setModalState({ type, data });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ type: null, data: {} });
    setText('');
  }, []);

  const openAddModal = useCallback(() => openModal('add'), [openModal]);

  const openEditModal = useCallback(
    (id: string | number, name: string) => {
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

  const handleAddWarehouse = useCallback(() => {
    const hasDuplicate = searchDuplicate();
    if (text.trim() && !hasDuplicate) {
      dispatch(
        addWarehouse({
          name: text.trim(),
          id: uuidv4(),
          products: [],
        }),
      );
      closeModal();
    }
    if (hasDuplicate) {
      toast.error('Склад с таким названием уже существует');
    }
  }, [text, dispatch, searchDuplicate, closeModal]);

  const handleEditWarehouse = useCallback(() => {
    const hasDuplicate = searchDuplicate();
    const currentWarehouse = warehouses.items.find(
      (item) => item.id === modalState.data?.warehouseId,
    );

    if (modalState.data?.warehouseId && text.trim()) {
      if (!hasDuplicate || text.trim() === currentWarehouse?.name) {
        dispatch(
          editWarehouse({
            id: modalState.data?.warehouseId,
            changes: { name: text.trim() },
          }),
        );
        closeModal();
      } else {
        toast.error('Склад с таким названием уже существует');
      }
    }
  }, [modalState.data?.warehouseId, text, dispatch, warehouses.items]);

  const handleDeleteWarehouse = useCallback(() => {
    if (modalState.data?.warehouseId) {
      dispatch(removeWarehouse(modalState.data.warehouseId));
      closeModal();
    }
  }, [dispatch, modalState.data?.warehouseId, closeModal]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setPage(page));
  };

  const renderModalContent = () => {
    switch (modalState.type) {
      case 'add':
      case 'edit':
        return (
          <div className={s.modalChildren}>
            <TextField
              id="outlined-basic"
              label="Название склада"
              variant="outlined"
              sx={{
                width: '400px',
                borderRadius: '12px',
              }}
              value={text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            />
          </div>
        );
      case 'delete':
        return (
          <div className={s.modalChildren}>
            <Typography variant="body1">
              Вы уверены, что хотите удалить склад `{modalState.data?.warehouseName}`?
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Это действие нельзя отменить.
            </Typography>
          </div>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalState.type) {
      case 'add':
        return 'Добавить склад';
      case 'edit':
        return 'Редактировать склад';
      case 'delete':
        return 'Подтверждение удаления';
      default:
        return '';
    }
  };

  const getSubmitButtonText = () => {
    switch (modalState.type) {
      case 'add':
        return 'Добавить';
      case 'edit':
        return 'Сохранить';
      case 'delete':
        return 'Удалить';
      default:
        return 'Подтвердить';
    }
  };

  const getSubmitHandler = () => {
    switch (modalState.type) {
      case 'add':
        return handleAddWarehouse;
      case 'edit':
        return handleEditWarehouse;
      case 'delete':
        return handleDeleteWarehouse;
      default:
        return undefined;
    }
  };

  return (
    <div className={s.warehousesContainer}>
      <div className={s.warehouseMain}>
        <div className={s.titleWarehouses}>
          <Typography variant="h3" gutterBottom>
            Мои склады
          </Typography>
          <CustomButton variant="contained" name="Добавить склад" onClick={openAddModal} />
        </div>
        <div className={s.warehouseBlock}>
          {displayedItems.length === 0 && <div> Нет ни одного склада</div>}

          {displayedItems.length > 0 &&
            displayedItems.map(({ id, name }: Warehouse) => {
              return (
                <div key={id} className={s.warehouseItem}>
                  <Link to={`/warehouse:${id}`}>{name}</Link>
                  <div className={s.warehouseButtons}>
                    <CustomButton
                      variant="outlined"
                      name="Редактировать"
                      onClick={() => openEditModal(id, name)}
                    />
                    <CustomButton
                      variant="outlined"
                      name="Удалить"
                      onClick={() => openDeleteModal(id, name)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {pagination.totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={pagination.totalPages}
            page={pagination.currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        onSubmit={getSubmitHandler()}
        submitButtonText={getSubmitButtonText()}
        modalTitle={getModalTitle()}
      >
        {renderModalContent()}
      </Modal>
      <Toaster />
    </div>
  );
};
