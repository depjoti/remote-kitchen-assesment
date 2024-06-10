import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { FoodItem } from '../../app/types';

export const fetchFoodItemsAsync = createAsyncThunk('food/fetchFoodItems', async () => {
  const response = await fetch('http://localhost:5000/foodItems');
  return await response.json();
});

export const addFoodItemAsync = createAsyncThunk('food/addFoodItem', async (item: FoodItem) => {
  const response = await fetch('http://localhost:5000/foodItems', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return await response.json();
});

export const updateFoodItemAsync = createAsyncThunk(
  'food/editFoodItem',
  async (updatedItem: FoodItem) => {
    const response = await fetch(`http://localhost:5000/foodItems/${updatedItem.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem),
    });
    return await response.json();
  }
);

export const deleteFoodItemAsync = createAsyncThunk(
  'food/deleteFoodItem',
  async (itemId: number) => {
    await fetch(`http://localhost:5000/foodItems/${itemId}`, { method: 'DELETE' });
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
    builder.addCase(fetchFoodItemsAsync.fulfilled, (state, action) => {
      state.foodItems = action.payload;
      state.loading = 'fulfilled';
      state.error = null;
    });

    builder.addCase(addFoodItemAsync.fulfilled, (state, action) => {
      state.foodItems.push(action.payload);
      state.loading = 'fulfilled';
      state.error = null;
    });

    builder.addCase(updateFoodItemAsync.fulfilled, (state, action) => {
      const index = state.foodItems.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.foodItems[index] = action.payload;
      }
      state.loading = 'fulfilled';
      state.error = null;
    });

    builder.addCase(deleteFoodItemAsync.fulfilled, (state, action) => {
      state.foodItems = state.foodItems.filter(item => item.id !== action.payload);
      state.loading = 'fulfilled';
      state.error = null;
    });

    // Handle re-fetch on rejection to keep state consistent
    builder.addCase(addFoodItemAsync.rejected, (state, action) => {
      state.error = action.error.message || 'An error occurred while adding the item';
      state.loading = 'rejected';
    });

    builder.addCase(updateFoodItemAsync.rejected, (state, action) => {
      state.error = action.error.message || 'An error occurred while updating the item';
      state.loading = 'rejected';
    });

    builder.addCase(deleteFoodItemAsync.rejected, (state, action) => {
      state.error = action.error.message || 'An error occurred while deleting the item';
      state.loading = 'rejected';
    });
  },
});

export const { setFoodItems } = foodSlice.actions;
export default foodSlice.reducer;

