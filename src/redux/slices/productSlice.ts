import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  name: string;
  id: string | number;
  quantity: number;
}

export interface ProductState {
  items: Product[];
  selectedProduct: Product | null;
}

const initialState: ProductState = {
  items: [],
  selectedProduct: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      return;
    },
    deleteProduct: (state, action: PayloadAction<Product>) => {
      return;
    },
  },
});

export const { addProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
