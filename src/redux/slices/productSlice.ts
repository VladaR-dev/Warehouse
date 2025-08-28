import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {  //Какие еще нужны параметры?
  name: string;
  id: string | number;
  quantity: number;
}

export interface ProductState {
  //Нужен ли loading?
  items: Product[];
  loading: boolean;
  selectedProduct: Product | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
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
