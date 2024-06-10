import { StringDecoder } from "string_decoder";

export interface FoodItem {
  id: string;
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

