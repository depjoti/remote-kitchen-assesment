// src/app/types.ts

// src/app/types.ts

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface RootState {
  food: {
    foodItems: FoodItem[];
  };
}

// export interface Food {
//     id: number;
//     name: string;
//     description: string;
//   }
  