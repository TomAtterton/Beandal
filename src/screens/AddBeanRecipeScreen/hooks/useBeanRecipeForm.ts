import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  BeanRecipeFormInput,
  BeanRecipeFormValues,
  beanRecipeSchema,
} from '@/validation/beanRecipeSchema';
import { Bean, Recipe, ShotResult } from '@/validation/coffeeSchemas';

type Params = {
  existingBean?: Bean;
  existingRecipe?: Recipe;
  existingShotResult?: ShotResult;
};

export const useBeanRecipeForm = ({ existingBean, existingRecipe, existingShotResult }: Params) => {
  const defaultValues: BeanRecipeFormInput = useMemo(
    () => ({
      beanName: existingBean?.name ?? '',
      roaster: existingBean?.roaster ?? '',
      roastLevel: existingBean?.roastLevel ?? 'medium',
      imageUri: existingBean?.imageUri ?? undefined,
      grindSetting: existingRecipe?.grindSetting ?? 15,
      dose: existingRecipe?.dose ?? 18,
      yield: existingRecipe?.yield ?? 36,
      temperature: existingRecipe?.temperature ?? 93,
      shotTime: existingShotResult?.shotTime ?? 30,
      tasteNotes: existingShotResult?.tasteNotes ?? [],
      rating: existingShotResult?.rating ?? 3,
    }),
    [
      existingBean?.imageUri,
      existingBean?.name,
      existingBean?.roaster,
      existingBean?.roastLevel,
      existingRecipe,
      existingShotResult,
    ],
  );

  const form = useForm<BeanRecipeFormInput, undefined, BeanRecipeFormValues>({
    resolver: zodResolver(beanRecipeSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  return {
    defaultValues,
    ...form,
  };
};
