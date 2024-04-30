import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { FoodItem } from '../app/types';
import { setFoodItems, deleteFoodItemAsync, addFoodItemAsync,updateFoodItemAsync } from '../lib/features/FoodSlice';

export const useFoodItems = () => {
  return useSelector((state: RootState) => state.food.foodItems);
};

export const useFoodActions = () => {
  const dispatch = useDispatch();

  const setItems = (items: FoodItem[]) => {
    dispatch(setFoodItems(items));
  };

  const addItem = async (item: FoodItem) => {
    try {
      await dispatch(addFoodItemAsync(item));
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };
  const editItem = async (updatedItem: FoodItem) => {
    try {
      
      await dispatch(updateFoodItemAsync(updatedItem));
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await dispatch(deleteFoodItemAsync(id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return { setItems, addItem, deleteItem,editItem };
};

