import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/redux/store';
import { setPage, setItemsPerPage, setTotalItems } from 'app/redux/slices/paginationSlice';

export const usePagination = (items: any[]) => {
  const dispatch = useDispatch();
  const pagination = useSelector((state: RootState) => state.pagination);

  const displayedItems = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, pagination.currentPage, pagination.itemsPerPage]);

  useEffect(() => {
    dispatch(setTotalItems(items.length));
  }, [dispatch, items.length]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    dispatch(setItemsPerPage(itemsPerPage));
  };

  const updateTotalItems = (total: number) => {
    dispatch(setTotalItems(total));
  };
  return {
    pagination,
    dispatch,
    displayedItems,
    handlePageChange,
    updateTotalItems,
    handleItemsPerPageChange,
  };
};
