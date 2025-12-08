import { useCallback } from 'react';
import { UseFormReset } from 'react-hook-form';
import * as crypto from 'expo-crypto';

import { useAppStore } from '@/store/appStore';
import { Bean, Recipe, ShotResult } from '@/validation/coffeeSchemas';
import { BeanRecipeFormInput, BeanRecipeFormValues } from '@/validation/beanRecipeSchema';

type Params = {
  existingBean?: Bean;
  existingRecipe?: Recipe;
  existingShotResult?: ShotResult;
  reset: UseFormReset<BeanRecipeFormInput>;
};

export const useBeanRecipeSubmission = ({
  existingBean,
  existingRecipe,
  existingShotResult,
  reset,
}: Params) => {
  const addBean = useAppStore((state) => state.addBean);
  const addRecipe = useAppStore((state) => state.addRecipe);
  const updateBean = useAppStore((state) => state.updateBean);
  const updateRecipe = useAppStore((state) => state.updateRecipe);
  const addShotResult = useAppStore((state) => state.addShotResult);
  const updateShotResult = useAppStore((state) => state.updateShotResult);
  const removeBean = useAppStore((state) => state.removeBean);
  const removeRecipe = useAppStore((state) => state.removeRecipe);

  const onSubmit = useCallback(
    async (values: BeanRecipeFormValues) => {
      const beanId = existingBean?.id ?? crypto.randomUUID();
      const recipeId = existingRecipe?.id ?? crypto.randomUUID();
      const shotResultId = existingShotResult?.id ?? crypto.randomUUID();

      if (existingBean) {
        updateBean(beanId, {
          name: values.beanName,
          roaster: values.roaster,
          roastLevel: values.roastLevel,
          imageUri: values.imageUri,
        });
      } else {
        addBean({
          id: beanId,
          name: values.beanName,
          roaster: values.roaster,
          roastLevel: values.roastLevel,
          roastDate: undefined,
          imageUri: values.imageUri,
          notes: undefined,
        });
      }

      if (existingRecipe) {
        updateRecipe(recipeId, {
          beanId,
          grindSetting: values.grindSetting,
          dose: values.dose,
          yield: values.yield,
          temperature: values.temperature,
        });
      } else {
        addRecipe({
          id: recipeId,
          beanId,
          grindSetting: values.grindSetting,
          dose: values.dose,
          yield: values.yield,
          temperature: values.temperature,
        });
      }

      if (existingShotResult) {
        updateShotResult(shotResultId, {
          recipeId,
          shotTime: values.shotTime,
          tasteNotes: values.tasteNotes,
          rating: values.rating,
        });
      } else {
        addShotResult({
          id: shotResultId,
          recipeId,
          shotTime: values.shotTime,
          tasteNotes: values.tasteNotes,
          rating: values.rating,
        });
      }

      reset(values);

      return { beanId, recipeId };
    },
    [
      addBean,
      addRecipe,
      addShotResult,
      existingBean,
      existingRecipe,
      existingShotResult,
      reset,
      updateBean,
      updateRecipe,
      updateShotResult,
    ],
  );

  const onDelete = useCallback(() => {
    if (!existingBean) return;
    removeBean(existingBean.id);
    if (existingRecipe) {
      removeRecipe(existingRecipe.id);
    }
  }, [existingBean, existingRecipe, removeBean, removeRecipe]);

  return { onSubmit, onDelete };
};
