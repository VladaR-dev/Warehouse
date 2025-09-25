import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from 'app/redux/store';
import { addWarehouse, removeWarehouse, editWarehouse } from 'app/redux/slices/warehouseSlice';
import toast from 'react-hot-toast';

export const useWarehouseActions = () => {
  const dispatch = useDispatch();
  const warehouses = useSelector((state: RootState) => state.warehouse);

  const searchDuplicate = useCallback(
    (text: string) => {
      return warehouses.items.some(
        ({ name }) => name.trim().toLowerCase() === text.trim().toLowerCase(),
      );
    },
    [warehouses.items],
  );

  const handleAddWarehouse = useCallback(
    (text: string) => {
      const hasDuplicate = searchDuplicate(text);
      if (text.trim() && !hasDuplicate) {
        dispatch(
          addWarehouse({
            name: text.trim(),
            id: uuidv4(),
            products: [],
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

  const handleEditWarehouse = useCallback(
    (warehouseId: string | number, text: string) => {
      const hasDuplicate = searchDuplicate(text);
      const currentWarehouse = warehouses.items.find((item) => item.id === warehouseId);

      if (warehouseId && text.trim()) {
        if (!hasDuplicate || text.trim() === currentWarehouse?.name) {
          dispatch(
            editWarehouse({
              id: warehouseId,
              changes: { name: text.trim() },
            }),
          );
          return true;
        } else {
          toast.error('Склад с таким названием уже существует');
        }
      }
      return false;
    },
    [dispatch, warehouses.items, searchDuplicate],
  );

  const handleDeleteWarehouse = useCallback(
    (warehouseId: string | number) => {
      if (warehouseId) {
        dispatch(removeWarehouse(warehouseId));
        return true;
      }
      return false;
    },
    [dispatch],
  );

  return {
    handleAddWarehouse,
    handleEditWarehouse,
    handleDeleteWarehouse,
  };
};
