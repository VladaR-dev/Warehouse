import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/redux/store';
import { setPage, setItemsPerPage, setTotalItems } from 'app/redux/slices/paginationSlice';

export const usePagination = () => {
  const dispatch = useDispatch();
  const pagination = useSelector((state: RootState) => state.pagination);

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
    handlePageChange,
    updateTotalItems,
    handleItemsPerPageChange,
  };
};
