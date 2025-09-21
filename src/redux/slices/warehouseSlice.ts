import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/redux/slices/productSlice';

export interface Warehouse {
  name: string;
  id: string | number;
  products: Product[];
}

export interface WarehousesState {
  items: Warehouse[];
  selectedWarehouseId: string | null;
}

const initialState: WarehousesState = {
  items: [],
  selectedWarehouseId: null,
};
export const warehouseSlice = createSlice({
  name: 'warehouses',
  initialState,
  reducers: {
    addWarehouse: (state, action: PayloadAction<Warehouse>) => {
      state.items.push(action.payload);
    },
    editWarehouse: (
      state,
      action: PayloadAction<{ id: string | number; changes: Partial<Warehouse> }>,
    ) => {
      const { id, changes } = action.payload;
      state.items = state.items.map((item) => (item.id === id ? { ...item, ...changes } : item));
    },
    removeWarehouse: (state, action: PayloadAction<string | number>) => {
      const warehouseId = action.payload;
      state.items = state.items.filter(({ id }) => id !== warehouseId);
    },
  },
});

export const { addWarehouse, editWarehouse, removeWarehouse } = warehouseSlice.actions;
export default warehouseSlice.reducer;
