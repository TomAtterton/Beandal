import { z } from 'zod';

const nameField = z
  .string()
  .trim()
  .min(1, 'Please add a bean name')
  .min(2, 'Bean name must be at least 2 characters')
  .max(60, 'Bean name must be 60 characters or fewer');

const optionalRoasterField = z
  .string()
  .trim()
  .max(60, 'Roaster must be 60 characters or fewer')
  .optional()
  .transform((value) => {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
  })
  .refine((value) => value === undefined || value.length >= 2, {
    message: 'Roaster must be at least 2 characters',
  });

const optionalNotesField = z
  .string()
  .trim()
  .max(300, 'Notes must be 300 characters or fewer')
  .optional()
  .transform((value) => {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
  });

const optionalImageUriField = z
  .string()
  .trim()
  .optional()
  .transform((value) => {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
  });

const boundedNumber = (label: string, { min, max }: { min: number; max: number }) =>
  z
    .number()
    .min(min, `${label} must be between ${min} and ${max}`)
    .max(max, `${label} must be between ${min} and ${max}`);

export const beanSchema = z.object({
  id: z.string(),
  name: nameField,
  roaster: optionalRoasterField,
  roastDate: z.string().optional(),
  imageUri: optionalImageUriField,
  notes: optionalNotesField,
});

export const recipeSchema = z.object({
  id: z.string(),
  beanId: z.string(),
  grindSetting: boundedNumber('Grind setting', { min: 0, max: 50 }),
  dose: boundedNumber('Dose', { min: 0, max: 30 }),
  yield: boundedNumber('Yield', { min: 0, max: 60 }),
  temperature: boundedNumber('Temperature', { min: 80, max: 100 }),
});

export type Bean = z.infer<typeof beanSchema>;
export type Recipe = z.infer<typeof recipeSchema>;
