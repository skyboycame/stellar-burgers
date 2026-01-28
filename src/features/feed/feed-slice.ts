import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData, TStatus } from '@utils-types';

interface ininitalFeedState {
  status: TStatus;
  error: null | string;
  ordersData: TOrdersData;
}

const initialState: ininitalFeedState = {
  status: 'idle',
  error: null,
  ordersData: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const fetchFeeds = createAsyncThunk<
  TOrdersData,
  undefined,
  { rejectValue: string }
>('@@feeds/fetchFeeds', async (_, { rejectWithValue }) => {
  try {
    const data = await getFeedsApi();
    return data;
  } catch (error) {
    console.error('Ошибка API', error);
    return rejectWithValue('Ошибка Загрузки Заказов');
  }
});

const feedSlice = createSlice({
  name: '@@feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload ?? 'Неизвестная Ошибка';
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.ordersData = action.payload;
        state.status = 'received';
        state.error = null;
      });
  }
});

export const feedReducer = feedSlice.reducer;
