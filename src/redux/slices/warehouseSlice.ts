import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Warehouse {
  //Какие еще нужны параметры?
  name: string;
  id: string | number;
}

export interface WarehouseState {
  //Нужен ли loading?
  items: Warehouse[];
  loading: boolean;
  selectedWarehouse: Warehouse | null;
}

const initialState: WarehouseState = {
  items: [],
  loading: false,
  selectedWarehouse: null,
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
    },//Доработаю позже по логике
  },
});

export const { addWarehouse, editWarehouse, removeWarehouse } = warehouseSlice.actions;
export default warehouseSlice.reducer;
