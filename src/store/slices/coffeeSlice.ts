import { AppStore, CoffeeSlice, SliceCreator } from '../types';

export const createCoffeeSlice: SliceCreator<CoffeeSlice> = (set) => ({
  beans: [],
  recipes: [],
  shotResults: [],
  tasteNoteTags: ['fruity', 'floral', 'nutty', 'chocolate', 'caramel', 'citrus', 'spice'],
  addBean: (bean) =>
    set((state: AppStore) => ({
      beans: [...state.beans, bean],
    })),
  addRecipe: (recipe) =>
    set((state: AppStore) => ({
      recipes: [...state.recipes, recipe],
    })),
  addShotResult: (shotResult) =>
    set((state: AppStore) => ({
      shotResults: [...state.shotResults, shotResult],
    })),
  addTasteNoteTag: (tag) =>
    set((state: AppStore) => ({
      tasteNoteTags: state.tasteNoteTags.includes(tag)
        ? state.tasteNoteTags
        : [...state.tasteNoteTags, tag],
    })),
  updateTasteNoteTag: (oldTag, newTag) =>
    set((state: AppStore) => ({
      tasteNoteTags: state.tasteNoteTags.map((tag) => (tag === oldTag ? newTag : tag)),
      // Update any shot results referencing the tag.
      shotResults: state.shotResults.map((shot) => ({
        ...shot,
        tasteNotes: shot.tasteNotes.map((note) => (note === oldTag ? newTag : note)),
      })),
    })),
  removeTasteNoteTag: (tag) =>
    set((state: AppStore) => ({
      tasteNoteTags: state.tasteNoteTags.filter((existing) => existing !== tag),
      shotResults: state.shotResults.map((shot) => ({
        ...shot,
        tasteNotes: shot.tasteNotes.filter((note) => note !== tag),
      })),
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
  updateShotResult: (id, updates) =>
    set((state: AppStore) => ({
      shotResults: state.shotResults.map((shotResult) =>
        shotResult.id === id ? { ...shotResult, ...updates } : shotResult,
      ),
    })),
  removeBean: (id) =>
    set((state: AppStore) => {
      const recipeIdsToRemove = state.recipes
        .filter((recipe) => recipe.beanId === id)
        .map((recipe) => recipe.id);

      return {
        beans: state.beans.filter((bean) => bean.id !== id),
        recipes: state.recipes.filter((recipe) => recipe.beanId !== id),
        shotResults: state.shotResults.filter(
          (shotResult) => !recipeIdsToRemove.includes(shotResult.recipeId),
        ),
      };
    }),
  removeRecipe: (id) =>
    set((state: AppStore) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
      shotResults: state.shotResults.filter((shotResult) => shotResult.recipeId !== id),
    })),
  removeShotResult: (id) =>
    set((state: AppStore) => ({
      shotResults: state.shotResults.filter((shotResult) => shotResult.id !== id),
    })),
});
