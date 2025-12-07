import { StateCreator } from 'zustand/vanilla';

import { Bean, Recipe } from '@/validation/coffeeSchemas';

export type CoffeeSlice = {
  beans: Bean[];
  recipes: Recipe[];
  addBean: (bean: Bean) => void;
  addRecipe: (recipe: Recipe) => void;
  updateBean: (id: string, updates: Partial<Bean>) => void;
  updateRecipe: (id: string, updates: Partial<Recipe>) => void;
  removeBean: (id: string) => void;
  removeRecipe: (id: string) => void;
};

export type AppStore = CoffeeSlice;

export type PersistMutators = [['zustand/persist', unknown]];

export type SliceCreator<TSlice> = StateCreator<AppStore, PersistMutators, [], TSlice>;
