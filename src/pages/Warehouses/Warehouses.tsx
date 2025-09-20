import React, { useState, useMemo, useEffect } from 'react';
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
  const state = useSelector((state: RootState) => state.warehouse);
  const pagination = useSelector((state: RootState) => state.pagination);
  const dispatch = useDispatch();
  console.log('state', state);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingWarehouseId, setEditingWarehouseId] = useState<string | number | null>(null);
  const [text, setText] = useState<string>('');

  const displayedItems = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return state.items.slice(startIndex, endIndex);
  }, [state.items, pagination.currentPage, pagination.itemsPerPage]);

  useEffect(() => {
    dispatch(setTotalItems(state.items.length));
  }, [dispatch, state.items.length]);

  const searchDuplicate = () => {
    return state.items.some(({ name }) => name.trim().toLowerCase() === text.trim().toLowerCase());
  };

  const handleAddWarehouse = () => {
    if (text.trim() && !searchDuplicate()) {
      dispatch(
        addWarehouse({
          name: text.trim(),
          id: uuidv4(),
          products: [],
        }),
      );
      setText('');
      setIsModalOpen(false);
    }
    if (searchDuplicate()) {
      toast.error('Склад с таким названием уже существует');
    }
  };

  const handleDeleteWarehouse = (id: string | number) => {
    dispatch(removeWarehouse(id));
  };

  const handleEditWarehouse = () => {
    if (editingWarehouseId && text.trim()) {
      if (
        !searchDuplicate() ||
        text.trim() === state.items.find((item) => item.id === editingWarehouseId)?.name
      ) {
        dispatch(
          editWarehouse({
            id: editingWarehouseId,
            changes: { name: text.trim() },
          }),
        );
        setText('');
        setIsModalOpen(false);
      } else {
        toast.error('Склад с таким названием уже существует');
      }
    }
  };

  const handleModalClose = () => {
    setText('');
    setModalMode('add');
    setEditingWarehouseId(null);
    setIsModalOpen(false);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setPage(page));
  };

  return (
    <div className={s.warehousesContainer}>
      <div className={s.warehouseMain}>
        <div className={s.titleWarehouses}>
          <Typography variant="h3" gutterBottom>
            Мои склады
          </Typography>
          <CustomButton
            variant="contained"
            name="Добавить склад"
            onClick={() => setIsModalOpen(true)}
          />
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
                      onClick={() => {
                        setModalMode('edit');
                        setEditingWarehouseId(id);
                        setText(name);
                        setIsModalOpen(true);
                      }}
                    />
                    <CustomButton
                      variant="outlined"
                      name="Удалить"
                      onClick={() => handleDeleteWarehouse(id)}
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

      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          onSubmit={modalMode === 'add' ? handleAddWarehouse : handleEditWarehouse}
          submitButtonText={modalMode === 'add' ? 'Добавить склад' : 'Редактировать'}
          modalTitle={modalMode === 'add' ? 'Добавить склад' : 'Редактировать'}
        >
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
        </Modal>
      )}
      <Toaster />
    </div>
  );
};
