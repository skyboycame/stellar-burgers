import { getOrdersApi, orderBurgerApi, TNewOrderResponse } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder, TStatus } from '@utils-types';

export type orderType = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
  status: TStatus;
  error: string | null;
  orderData: TNewOrderResponse | null;
  profileOrders: TOrder[] | null;
};

const initialState: orderType = {
  bun: null,
  ingredients: [],
  status: 'idle',
  error: null,
  orderData: null,
  profileOrders: null
};

export const sendOrder = createAsyncThunk<
  TNewOrderResponse,
  string[],
  { rejectValue: string }
>('@@basket/sendOrder', async (data, { rejectWithValue }) => {
  try {
    return await orderBurgerApi(data);
  } catch {
    return rejectWithValue('Ошибка Создания Заказа');
  }
});

export const getOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('@@basket/getOrder', async (_, { rejectWithValue }) => {
  try {
    return await getOrdersApi();
  } catch {
    return rejectWithValue('Ошибка Создания Заказа');
  }
});

const orderSlice = createSlice({
  name: '@@basket',
  initialState,
  reducers: {
    addIngredients: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    deleteIngredients: (state, action: PayloadAction<string>) => {
      const newIngrds = state.ingredients.filter(
        (ing) => ing._id !== action.payload
      );
      state.ingredients = newIngrds;
    },
    moveUpIngredient: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (ing) => ing._id === action.payload
      );
      if (index > 0) {
        const temp = state.ingredients[index - 1];
        state.ingredients[index - 1] = state.ingredients[index];
        state.ingredients[index] = temp;
      }
    },
    moveDownIngredient: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (ing) => ing._id === action.payload
      );
      if (index < state.ingredients.length - 1) {
        const temp = state.ingredients[index + 1];
        state.ingredients[index + 1] = state.ingredients[index];
        state.ingredients[index] = temp;
      }
    },
    clearOrder: (state) => {
      state.orderData = null;
      state.status = 'idle';
      state.ingredients = [];
      state.bun = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.status = 'received';
        state.error = null;
        state.orderData = action.payload;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || 'Неизвестная ошибка';
      });
    builder
      .addCase(getOrders.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = 'received';
        state.error = null;
        state.profileOrders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || 'Неизвестная ошибка';
      });
  }
});

export const {
  addIngredients,
  deleteIngredients,
  moveUpIngredient,
  moveDownIngredient,
  clearOrder
} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
