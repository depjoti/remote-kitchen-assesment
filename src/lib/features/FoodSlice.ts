

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../lib/store';
import { FoodItem } from '../../app/types';

type AddFoodItemResponse = FoodItem;

export const addFoodItemAsync = createAsyncThunk(
  'food/addFoodItem',
  async (item: FoodItem) => {
    const response = await fetch('http://localhost:5000/foodItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    return data;
  }
);

export const updateFoodItemAsync = createAsyncThunk(
  'food/editFoodItem',
  async (updatedItem: FoodItem) => {
    const response = await fetch('http://localhost:5000/foodItems/'+updatedItem.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    });
    const data = await response.json();
    return data;
  }
);



export const deleteFoodItemAsync = createAsyncThunk(
  'food/deleteFoodItem',
  async (itemId: number) => {
    await fetch('http://localhost:5000/foodItems/' + itemId, {
      method: 'DELETE',
    });
    return itemId;
  }
);


interface FoodState {
  foodItems: FoodItem[];
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

const initialState: FoodState = {
  foodItems: [],
  loading: 'idle',
  error: null,
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoodItems(state, action: PayloadAction<FoodItem[]>) {
      state.foodItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFoodItemAsync.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(addFoodItemAsync.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.error = null;
        state.foodItems.push(action.payload);
      })
      .addCase(addFoodItemAsync.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(updateFoodItemAsync.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(updateFoodItemAsync.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.error = null;
        state.foodItems = state.foodItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(updateFoodItemAsync.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(deleteFoodItemAsync.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(deleteFoodItemAsync.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.error = null;
        state.foodItems = state.foodItems.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteFoodItemAsync.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { setFoodItems} = foodSlice.actions;
export default foodSlice.reducer;

