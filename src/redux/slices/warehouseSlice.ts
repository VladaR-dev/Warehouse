import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/redux/slices/productSlice';

export interface Warehouse {
  //Какие еще нужны параметры?
  name: string;
  id: string | number;
  products: Product[];
}

export interface WarehousesState {
  //Нужен ли loading?
  items: Warehouse[];
  selectedWarehouseId: string | null;
}

const initialState: WarehousesState = {
  items: [],
  selectedWarehouseId: null,
};
//Так как у нас нет асинхронных операций extraReducer нет надобности использовать?
export const warehouseSlice = createSlice({
  name: 'warehouses',
  initialState,
  reducers: {
    addWarehouse: (state, action: PayloadAction<Warehouse>) => {
      state.items.push(action.payload);
    },
    editWarehouse: (state, action) => {
      return;
    }, //Доработаю позже по логике
    removeWarehouse: (state, action) => {
      return;
    }, //Доработаю позже по логике
  },
});

export const { addWarehouse, editWarehouse, removeWarehouse } = warehouseSlice.actions;
export default warehouseSlice.reducer;
