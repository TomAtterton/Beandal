import { AppStore, CoffeeSlice, SliceCreator } from '../types';

export const createCoffeeSlice: SliceCreator<CoffeeSlice> = (set) => ({
  beans: [],
  recipes: [],
  addBean: (bean) =>
    set((state: AppStore) => ({
      beans: [...state.beans, bean],
    })),
  addRecipe: (recipe) =>
    set((state: AppStore) => ({
      recipes: [...state.recipes, recipe],
    })),
  updateBean: (id, updates) =>
    set((state: AppStore) => ({
      beans: state.beans.map((bean) => (bean.id === id ? { ...bean, ...updates } : bean)),
    })),
  updateRecipe: (id, updates) =>
    set((state: AppStore) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updates } : recipe,
      ),
    })),
  removeBean: (id) =>
    set((state: AppStore) => ({
      beans: state.beans.filter((bean) => bean.id !== id),
      recipes: state.recipes.filter((recipe) => recipe.beanId !== id),
    })),
  removeRecipe: (id) =>
    set((state: AppStore) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),
});
