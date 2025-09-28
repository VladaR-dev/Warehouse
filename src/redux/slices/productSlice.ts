import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  name: string;
  id: string | number;
  quantity: number;
}

export interface ProductState {
  items: Product[];
}

const initialState: ProductState = {
  items: [],
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<string | number>) => {
      const productId = action.payload;
      state.items = state.items.filter(({ id }) => id !== productId);
    },
    searchProducts: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(({ name }) =>
        name.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
  },
});

export const { addProduct, deleteProduct, searchProducts } = productSlice.actions;
export default productSlice.reducer;
