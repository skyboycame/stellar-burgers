import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TStatus } from '@utils-types';

type initialStateType = {
  list: TIngredient[];
  status: TStatus;
  isLoading: boolean;
  error: string | null;
};

const initialState: initialStateType = {
  list: [],
  status: 'idle',
  error: null,
  isLoading: false
};

export const fetchIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { rejectValue: string }
>('@@ingredients/fetchIngredients', async (_, { rejectWithValue }) => {
  try {
    const data = await getIngredientsApi();
    return data;
  } catch (error) {
    console.error('Ошибка API:', error);
    return rejectWithValue('Ошибка загрузки ингредиентов');
  }
});
const ingredientsSlice = createSlice({
  name: '@@ingredients',
  initialState,
  reducers: {
    resetState: (state) => {
      state.error = null;
      state.list = [];
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload ?? 'Незвестная ошибка';
        state.isLoading = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = 'received';
        state.error = null;
        state.list = action.payload;
        state.isLoading = false;
      });
  }
});

export const { resetState } = ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;
