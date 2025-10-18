import { useSelector } from 'react-redux';
import { RootState } from 'app/redux/store';
import { usePagination } from 'app/hooks/usePagination';

export const usePaginationWarehouse = () => {
  const warehouses = useSelector((state: RootState) => state.warehouse);
  const { displayedItems, pagination, dispatch } = usePagination(warehouses.items);

  return {
    warehouses: {
      ...warehouses,
      items: warehouses.items,
      displayedItems,
    },
    pagination,
    dispatch,
  };
};
