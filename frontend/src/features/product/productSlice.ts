import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import axios from 'axios';

const initialState: ProductState = {
  product: [{}],
  status: 'idle',
  selectedproduct: {}
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

    // For all product list
    getProduct: (state: any, action: PayloadAction<any>) => {
      state.product = action.payload;
    },

    // For single product 
    getSelectedProduct: (state: any, action: PayloadAction<any>) => {
      state.selectedproduct = action.payload;
    },

    // For product status
    setStatus: (state: any, action: PayloadAction<any>) => {
      state.status = action.payload;
    },
  },
});

// export all reducer as actions for further usecase
export const { getProduct, getSelectedProduct, setStatus } = productSlice.actions;


// get all product
export const getProductAsync = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setStatus('loading'));
    const { data } = await axios.get('http://localhost:3000/products');
    dispatch(getProduct(data));
    dispatch(setStatus('idle'));
  } catch (error) {
    dispatch(setStatus('failed'));
  }
};

// Create product
export const AddProductAsync = (prod: IProduct): AppThunk => async (dispatch) => {
  try {
    dispatch(setStatus('loading'));
    await axios.post('http://localhost:3000/products', prod);
    dispatch(getProductAsync());
    dispatch(setStatus('idle'));
  } catch (error) {
    dispatch(setStatus('failed'));
  }
};


// Get single product
export const getSelectedProductAsync = (prodId: any, setProduct: any): AppThunk => async (dispatch) => {
  try {
    dispatch(setStatus('loading'));
    const { data } = await axios.get(`http://localhost:3000/products/${prodId}`);
    dispatch(getSelectedProduct(data));
    setProduct(data);
    dispatch(setStatus('idle'));
  } catch (error) {
    dispatch(setStatus('failed'));
  }
};

// Update Single product
export const UpdateProductAsync = (prod: IProduct, navigate: any): AppThunk => async (dispatch) => {
  try {
    dispatch(setStatus('loading'));
    await axios.put(`http://localhost:3000/products/${prod.id}`, prod);
    dispatch(getProductAsync());
    dispatch(setStatus('idle'));
    navigate("/", { replace: true });
  } catch (error) {
    dispatch(setStatus('failed'));
  }
};

// Delete single product
export const DeleteProductAsync = (prodId: any, navigate: any): AppThunk => async (dispatch) => {
  try {
    dispatch(setStatus('loading'));
    await axios.delete(`http://localhost:3000/products/${prodId}`);
    dispatch(getProductAsync());
    dispatch(setStatus('idle'));
    navigate("/", { replace: true });
  } catch (error) {
    dispatch(setStatus('failed'));
  }
};

interface IProduct {
  id?: string;
  title?: string;
  price?: number;
  description?: string;
}

export interface ProductState {
  product: [IProduct];
  selectedproduct: {};
  status: 'idle' | 'loading' | 'failed';
}

export default productSlice.reducer;
