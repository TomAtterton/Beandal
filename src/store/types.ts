import { StateCreator } from 'zustand/vanilla';

import { Bean, Recipe, ShotResult } from '@/validation/coffeeSchemas';

export type CoffeeSlice = {
  beans: Bean[];
  recipes: Recipe[];
  shotResults: ShotResult[];
  tasteNoteTags: string[];
  addBean: (bean: Bean) => void;
  addRecipe: (recipe: Recipe) => void;
  addShotResult: (shotResult: ShotResult) => void;
  addTasteNoteTag: (tag: string) => void;
  updateTasteNoteTag: (oldTag: string, newTag: string) => void;
  removeTasteNoteTag: (tag: string) => void;
  updateBean: (id: string, updates: Partial<Bean>) => void;
  updateRecipe: (id: string, updates: Partial<Recipe>) => void;
  updateShotResult: (id: string, updates: Partial<ShotResult>) => void;
  removeBean: (id: string) => void;
  removeRecipe: (id: string) => void;
  removeShotResult: (id: string) => void;
};

export type AppStore = CoffeeSlice;

export type PersistMutators = [['zustand/persist', unknown]];

export type SliceCreator<TSlice> = StateCreator<AppStore, PersistMutators, [], TSlice>;
