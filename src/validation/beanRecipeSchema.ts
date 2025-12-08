import { z } from 'zod';

import { beanSchema, recipeSchema, shotResultSchema } from './coffeeSchemas';

const recipeInputsSchema = recipeSchema.pick({
  grindSetting: true,
  dose: true,
  yield: true,
  temperature: true,
});

const shotResultInputsSchema = shotResultSchema.pick({
  shotTime: true,
  tasteNotes: true,
  rating: true,
});

export const beanRecipeSchema = z.object({
  beanName: beanSchema.shape.name,
  roaster: beanSchema.shape.roaster,
  roastLevel: beanSchema.shape.roastLevel,
  imageUri: beanSchema.shape.imageUri,
  ...recipeInputsSchema.shape,
  ...shotResultInputsSchema.shape,
});

export type BeanRecipeFormInput = z.input<typeof beanRecipeSchema>;
export type BeanRecipeFormValues = z.output<typeof beanRecipeSchema>;
