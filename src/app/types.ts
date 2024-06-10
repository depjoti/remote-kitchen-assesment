
export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}


export interface RootState {
  food: {
    foodItems: FoodItem[];
  };
}

