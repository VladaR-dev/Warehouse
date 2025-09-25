import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/redux/store';
import { setTotalItems } from 'app/redux/slices/paginationSlice';

export const useWarehouses = () => {
  const warehouses = useSelector((state: RootState) => state.warehouse);
  const pagination = useSelector((state: RootState) => state.pagination);
  const dispatch = useDispatch();

  const displayedItems = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return warehouses.items.slice(startIndex, endIndex);
  }, [warehouses.items, pagination.currentPage, pagination.itemsPerPage]);

  useEffect(() => {
    dispatch(setTotalItems(warehouses.items.length));
  }, [dispatch, warehouses.items.length]);

  return {
    warehouses,
    pagination,
    displayedItems,
    dispatch,
  };
};
