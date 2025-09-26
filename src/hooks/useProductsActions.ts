import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from 'app/redux/store';
import { addProduct, deleteProduct } from 'app/redux/slices/productSlice';

export const useProductsActions = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product);

  const searchDuplicate = useCallback(
    (text: string) => {
      return products.items.some(
        ({ name }) => name.trim().toLowerCase() === text.trim().toLowerCase(),
      );
    },
    [products.items],
  );

  const handleAddProducts = useCallback(
    (text: string) => {
      const hasDuplicate = searchDuplicate(text);
      if (text.trim() && !hasDuplicate) {
        dispatch(
          addProduct({
            name: text.trim(),
            id: uuidv4(),
            quantity: 0,
          }),
        );
        return true;
      }
      if (hasDuplicate) {
        toast.error('Склад с таким названием уже существует');
      }
      return false;
    },
    [dispatch, searchDuplicate],
  );

  const handleDeleteProducts = useCallback(
    (id: string | number) => {
      if (id) {
        dispatch(deleteProduct(id));
        return true;
      }
      return false;
    },
    [dispatch],
  );

  return {
    handleAddProducts,
    handleDeleteProducts,
  };
};
