import { AppStore } from './types';

type PersistedState = Partial<AppStore> | undefined;

export const migrateState = (persistedState: unknown): Partial<AppStore> => {
  const state = (persistedState as PersistedState) ?? { beans: [], recipes: [], shotResults: [] };

  return {
    ...state,
    beans: state.beans?.map((bean) => ({
      ...bean,
      roastLevel: bean.roastLevel ?? 'medium',
    })),
    shotResults:
      state.shotResults?.map((shot) => {
        const tasteNotes = Array.isArray(shot.tasteNotes)
          ? shot.tasteNotes
          : shot.tasteNotes
          ? [shot.tasteNotes]
          : [];

        return {
          ...shot,
          tasteNotes: tasteNotes.map((note) => String(note)).filter((note) => note.length > 0),
        };
      }) ?? [],
    tasteNoteTags: state.tasteNoteTags ?? [
      'fruity',
      'floral',
      'nutty',
      'chocolate',
      'caramel',
      'citrus',
      'spice',
    ],
  };
};
