import { z } from 'zod';

import { beanSchema, recipeSchema } from './coffeeSchemas';

const recipeInputsSchema = recipeSchema.pick({
  grindSetting: true,
  dose: true,
  yield: true,
  temperature: true,
});

export const beanRecipeSchema = z.object({
  beanName: beanSchema.shape.name,
  roaster: beanSchema.shape.roaster,
  imageUri: beanSchema.shape.imageUri,
  ...recipeInputsSchema.shape,
});

export type BeanRecipeFormInput = z.input<typeof beanRecipeSchema>;
export type BeanRecipeFormValues = z.output<typeof beanRecipeSchema>;
