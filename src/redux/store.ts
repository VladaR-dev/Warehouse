import { configureStore } from '@reduxjs/toolkit';
import warehouseReducer from './slices/warehouseSlice';
import paginationReducer from './slices/paginationSlice';

export const store = configureStore({
  reducer: {
    warehouse: warehouseReducer,
    // product: productReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
