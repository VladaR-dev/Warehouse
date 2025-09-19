import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  itemsPerPage: 8,
  totalItems: 0,
  totalPages: 0,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
      state.totalPages = Math.ceil(action.payload / state.itemsPerPage);
    },
  },
});

export const { setPage, setItemsPerPage, setTotalItems } = paginationSlice.actions;
export default paginationSlice.reducer;
