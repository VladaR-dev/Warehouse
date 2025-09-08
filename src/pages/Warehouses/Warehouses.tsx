import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Typography, TextField, Pagination, Box } from '@mui/material';

import { addWarehouse, Warehouse } from '../../redux/slices/warehouseSlice';
import { setPage, setTotalItems } from '../../redux/slices/paginationSlice';
import { CustomButton, Modal } from '../../components';
import { RootState } from '../../redux/store';
import s from './Warehouses.module.scss';

export const Warehouses: React.FC = () => {
  const state = useSelector((state: RootState) => state.warehouse);
  const pagination = useSelector((state: RootState) => state.pagination);
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const displayedItems = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return state.items.slice(startIndex, endIndex);
  }, [state.items, pagination.currentPage, pagination.itemsPerPage]);

  useEffect(() => {
    dispatch(setTotalItems(state.items.length));
  }, [dispatch, state.items.length]);

  const handleAddWarehouse = () => {
    if (text.trim()) {
      dispatch(
        addWarehouse({
          name: text.trim(),
          id: uuidv4(),
          products: [],
        }),
      );
      setText('');
      setIsActive(false);
    }
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
            onClick={() => setIsActive(true)}
          />
        </div>
        <div className={s.warehouseBlock}>
          {displayedItems.length === 0 ? (
            <div> Нет ни одного склада</div>
          ) : (
            displayedItems.map(({ id, name }: Warehouse) => {
              return (
                <div key={id} className={s.warehouseItem}>
                  <Link to={`/warehouse:${id}`}>{name}</Link>
                  <div className={s.warehouseButtons}>
                    <CustomButton variant="outlined" name="Редактировать" />
                    <CustomButton variant="outlined" name="Удалить" />
                  </div>
                </div>
              );
            })
          )}
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

      <Modal active={isActive} setActive={setIsActive}>
        <div className={s.modalChildren}>
          <Typography variant="h4" gutterBottom>
            Добавить склад
          </Typography>
          <TextField
            id="outlined-basic"
            label="Название склада"
            variant="outlined"
            sx={{
              width: '100%',
              borderRadius: '12px',
            }}
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          />
          <CustomButton
            variant="contained"
            name="Добавить склад"
            onClick={() => handleAddWarehouse()}
          />
        </div>
      </Modal>
    </div>
  );
};
