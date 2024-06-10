import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { FoodItem } from '../app/types';
import { setFoodItems, fetchFoodItemsAsync, addFoodItemAsync, updateFoodItemAsync, deleteFoodItemAsync } from '../lib/features/FoodSlice';

export const useFoodItems = () => {
  return useSelector((state: RootState) => state.food.foodItems);
};

export const useFoodActions = () => {
  const dispatch = useDispatch();

  const setItems = (items: FoodItem[]) => {
    dispatch(setFoodItems(items));
  };

  const fetchItems = async () => {
    await dispatch(fetchFoodItemsAsync());
  };

  const addItem = async (item: FoodItem) => {
    try {
      await dispatch(addFoodItemAsync(item)).unwrap();
      fetchItems(); // Re-fetch data after adding
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const editItem = async (updatedItem: FoodItem) => {
    try {
      await dispatch(updateFoodItemAsync(updatedItem)).unwrap();
      fetchItems(); // Re-fetch data after updating
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await dispatch(deleteFoodItemAsync(id)).unwrap();
      fetchItems(); // Re-fetch data after deleting
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return { setItems, fetchItems, addItem, deleteItem, editItem };
};

