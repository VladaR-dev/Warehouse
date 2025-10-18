import { useSelector } from 'react-redux';
import { RootState } from 'app/redux/store';
import { usePagination } from 'app/hooks/usePagination';

export const usePaginationProducts = () => {
  const products = useSelector((state: RootState) => state.product);
  const { displayedItems, pagination, dispatch, handlePageChange, handleItemsPerPageChange } = usePagination(products.items);

  return {
    products: {
      ...products,
      items: products.items,
      displayedItems,
    },
    pagination,
    dispatch,
      handlePageChange,
      handleItemsPerPageChange
  };
};
