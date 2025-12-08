import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { StateCreator } from 'zustand/vanilla';
import { createJSONStorage, persist } from 'zustand/middleware';

import { createCoffeeSlice } from './slices/coffeeSlice';
import { migrateState } from './migration';
import { AppStore, PersistMutators } from './types';

const createAppStoreState: StateCreator<AppStore, PersistMutators> = (set, get, store) => ({
  ...createCoffeeSlice(set, get, store),
});

export const useAppStore = create<AppStore>()(
  persist<AppStore, [], [], Partial<AppStore>>(createAppStoreState, {
    name: 'coffee-store',
    version: 3,
    storage: createJSONStorage<Partial<AppStore>>(() => AsyncStorage),
    migrate: migrateState,
    partialize: (state) => ({
      beans: state.beans,
      recipes: state.recipes,
      shotResults: state.shotResults,
      tasteNoteTags: state.tasteNoteTags,
    }),
  }),
);
