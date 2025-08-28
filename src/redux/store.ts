import { configureStore } from '@reduxjs/toolkit';
import warehouseReducer from './slices/warehouseSlice';

export const store = configureStore({
  reducer: {
    warehouse: warehouseReducer,
    // product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
