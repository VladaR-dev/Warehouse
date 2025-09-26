import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Pagination, Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';

import { WarehouseType } from 'app/redux/slices/warehouseSlice';
import { setPage } from 'app/redux/slices/paginationSlice';
import {
  usePaginationWarehouse,
  useWarehouseModal,
  useWarehouseActions,
  usePagination,
} from 'app/hooks';
import { WarehousesModalContent, CustomButton, Modal, WarehousesList } from 'app/components';
import { getModalTitle, getSubmitButtonText } from 'app/utils';
import s from './Warehouses.module.scss';
import { RootState } from 'app/redux/store';

export const Warehouses: React.FC = () => {
  const { pagination, dispatch } = usePaginationWarehouse();
  const warehouses = useSelector((state: RootState) => state.warehouse);
  const { displayedItems } = usePagination(warehouses.items);
  const {
    modalState,
    text,
    setText,
    isModalOpen,
    openAddModal,
    openEditModal,
    openDeleteModal,
    closeModal,
  } = useWarehouseModal();
  const { handleAddWarehouse, handleEditWarehouse, handleDeleteWarehouse } = useWarehouseActions();

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setPage(page));
  };

  const handleSubmit = () => {
    let success = false;

    switch (modalState.type) {
      case 'add':
        success = handleAddWarehouse(text);
        break;
      case 'edit':
        if (modalState.data?.id) {
          success = handleEditWarehouse(modalState.data.id, text);
        }
        break;
      case 'delete':
        if (modalState.data?.id) {
          success = handleDeleteWarehouse(modalState.data.id);
        }
        break;
    }

    if (success) {
      closeModal();
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
            displayedItems.map(({ id, name }: WarehouseType) => (
              <div key={id} className={s.warehouseItem}>
                <WarehousesList
                  id={id}
                  name={name}
                  openEditModal={openEditModal}
                  openDeleteModal={openDeleteModal}
                />
              </div>
            ))}
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
        onSubmit={handleSubmit}
        submitButtonText={getSubmitButtonText(modalState.type)}
        modalTitle={getModalTitle(modalState.type, false)}
      >
        <WarehousesModalContent modalState={modalState} text={text} setText={setText} />
      </Modal>
      <Toaster />
    </div>
  );
};
