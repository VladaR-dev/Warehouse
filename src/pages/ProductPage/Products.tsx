import React from 'react';
import { Typography, TextField, Box, Pagination } from '@mui/material';
import { CustomButton, Modal, ProductsList, ProductsModalContent } from 'app/components';
import {
  usePaginationProducts,
  useProductsModal,
  useProductsActions,
} from 'app/hooks';
import { getModalTitle, getSubmitButtonText } from 'app/utils';
import { setPage } from 'app/redux/slices/paginationSlice';
import { Product } from 'app/redux/slices/productSlice';
import s from './Products.module.scss';

export const Products = () => {
  const { pagination, dispatch, products } = usePaginationProducts();
  const { displayedItems } = products;
  const {
    modalState,
    text,
    setText,
    isModalOpen,
    openAddModal,
    openDeleteModal,
    closeModal,
    quantity,
    setQuantity,
  } = useProductsModal();
  const { handleAddProducts, handleDeleteProducts } = useProductsActions();
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setPage(page));
  };

  const handleSubmit = () => {
    let success = false;

    switch (modalState.type) {
      case 'add':
        success = handleAddProducts(text, Number(quantity));
        break;
      case 'delete':
        if (modalState.data?.id) {
          success = handleDeleteProducts(modalState.data.id);
        }
        break;
    }

    if (success) {
      closeModal();
    }
  };

  return (
    <div className={s.productsContainer}>
      <div className={s.productsMain}>
        <div className={s.productsTitle}>
          <Typography variant="h3" gutterBottom>
            Продукты
          </Typography>
          <div className={s.inputsMui}>
            <TextField id="outlined-basic" label="Поиск" variant="outlined" />
            <CustomButton
              variant="contained"
              color="primary"
              name="Добавить товар"
              onClick={openAddModal}
            />
          </div>
        </div>
        <div className={s.productsBlock}>
          {displayedItems.length === 0 && <div> Товаров нет</div>}
          {displayedItems.length > 0 &&
            displayedItems.map(({ id, name, quantity }: Product) => (
              <div key={id} className={s.productsItem}>
                <ProductsList
                  id={id}
                  name={name}
                  quantity={quantity}
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
        modalTitle={getModalTitle(modalState.type, true)}
      >
        <ProductsModalContent
          modalState={modalState}
          text={text}
          setText={setText}
          quantity={Number(quantity)}
          setQuantity={setQuantity}
        />
      </Modal>
    </div>
  );
};
