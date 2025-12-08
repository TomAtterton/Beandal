import React, { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FormTextInput } from '@/components/FormTextInput';
import { ImagePicker } from '@/components/ImagePicker';
import { NumericStepper } from '@/components/NumericStepper';
import { TranslatedText } from '@/components/TranslatedText';
import { IconButton, LabelButton } from '@/components/buttons';
import { useAppStore } from '@/store/appStore';
import { BeanRecipeFormInput, BeanRecipeFormValues } from '@/validation/beanRecipeSchema';
import { useBeanRecipeForm } from './hooks/useBeanRecipeForm';
import { useBeanRecipeSubmission } from './hooks/useBeanRecipeSubmission';
import { theme } from '@theme';

export const AddBeanRecipeScreen = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ beanId?: string; recipeId?: string }>();
  const beanIdParam = typeof params.beanId === 'string' ? params.beanId : undefined;
  const recipeIdParam = typeof params.recipeId === 'string' ? params.recipeId : undefined;

  const existingBean = useAppStore((state) =>
    beanIdParam ? state.beans.find((bean) => bean.id === beanIdParam) : undefined,
  );
  const existingRecipe = useAppStore((state) => {
    if (recipeIdParam) {
      return state.recipes.find((recipe) => recipe.id === recipeIdParam);
    }
    if (beanIdParam) {
      return state.recipes.find((recipe) => recipe.beanId === beanIdParam);
    }
    return undefined;
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useBeanRecipeForm({ existingBean, existingRecipe });

  const { onSubmit, onDelete } = useBeanRecipeSubmission({
    existingBean,
    existingRecipe,
    reset,
  });

  const [isDeleting, setIsDeleting] = useState(false);

  const navigateBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  }, [router]);

  const handleSubmitAndNavigate = useCallback(
    async (values: BeanRecipeFormValues) => {
      await onSubmit(values);
      navigateBack();
    },
    [navigateBack, onSubmit],
  );

  const handleDelete = useCallback(async () => {
    if (!existingBean) return;
    Alert.alert(
      t('addBeanRecipe.deleteWarningTitle'),
      t('addBeanRecipe.deleteWarningMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('addBeanRecipe.delete'),
          style: 'destructive',
          onPress: async () => {
            setIsDeleting(true);
            try {
              onDelete();
              navigateBack();
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ],
      { cancelable: true },
    );
  }, [existingBean, navigateBack, onDelete, t]);

  const isEditing = Boolean(existingBean);
  const actionKey = isSubmitting
    ? isEditing
      ? 'addBeanRecipe.updating'
      : 'addBeanRecipe.saving'
    : isEditing
    ? 'addBeanRecipe.update'
    : 'addBeanRecipe.save';
  const headerTitle = t(isEditing ? 'addBeanRecipe.editTitle' : 'addBeanRecipe.title');
  const headerRight = isEditing
    ? () => (
        <IconButton
          accessibilityLabel={t('addBeanRecipe.delete')}
          iconName="trash-outline"
          iconColor={theme.colors.danger}
          disabled={isSubmitting || isDeleting}
          onPress={handleDelete}
        />
      )
    : undefined;

  return (
    <>
      <Stack.Screen options={{ title: headerTitle, headerRight }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + theme.metrics.spacing.xl },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <FormTextInput<BeanRecipeFormInput>
          name="beanName"
          control={control}
          labelTranslation="form.beanName"
          placeholder={t('form.beanNamePlaceholder')}
        />

        <FormTextInput<BeanRecipeFormInput>
          name="roaster"
          control={control}
          labelTranslation="form.roaster"
          placeholder={t('form.roasterPlaceholder')}
          autoCapitalize="words"
        />

        <Controller
          control={control}
          name="imageUri"
          render={({ field: { value, onChange } }) => (
            <>
              <TranslatedText translation="form.beanImage" variant="h4" style={styles.label} />
              <ImagePicker imageUri={value} onChange={onChange} disabled={isSubmitting} />
            </>
          )}
        />

        <Controller
          control={control}
          name="grindSetting"
          render={({ field: { value, onChange } }) => (
            <NumericStepper
              labelTranslation="form.grindSetting"
              value={value ?? 0}
              onChange={(next) => onChange(next)}
              min={0}
              max={50}
              step={1}
            />
          )}
        />

        <Controller
          control={control}
          name="dose"
          render={({ field: { value, onChange } }) => (
            <NumericStepper
              labelTranslation="form.dose"
              value={value ?? 0}
              onChange={(next) => onChange(next)}
              min={0}
              max={30}
              step={0.5}
            />
          )}
        />

        <Controller
          control={control}
          name="yield"
          render={({ field: { value, onChange } }) => (
            <NumericStepper
              labelTranslation="form.yield"
              value={value ?? 0}
              onChange={(next) => onChange(next)}
              min={0}
              max={60}
              step={0.5}
            />
          )}
        />

        <Controller
          control={control}
          name="temperature"
          render={({ field: { value, onChange } }) => (
            <NumericStepper
              labelTranslation="form.temperature"
              value={value ?? 0}
              onChange={(next) => onChange(next)}
              min={80}
              max={100}
              step={0.5}
            />
          )}
        />

        <View style={styles.submitContainer}>
          <LabelButton
            translation={actionKey}
            onPress={handleSubmit(handleSubmitAndNavigate)}
            isLoading={isSubmitting || isDeleting}
            disabled={isDeleting}
          />
        </View>
        {isSubmitting ? (
          <View style={[styles.loadingOverlay, { paddingBottom: insets.bottom }]}>
            <ActivityIndicator color={theme.colors.accent} />
          </View>
        ) : null}
      </ScrollView>
    </>
  );
};

export default AddBeanRecipeScreen;

const styles = StyleSheet.create({
  content: {
    padding: theme.metrics.spacing.lg,
  },
  title: {
    fontSize: 20,
    marginBottom: theme.metrics.spacing.md,
  },
  label: {
    marginBottom: theme.metrics.spacing.xs,
    fontStyle: 'italic',
  },
  submitContainer: {
    marginTop: theme.metrics.spacing.lg,
    gap: theme.metrics.spacing.sm,
  },
  loadingOverlay: {
    marginTop: theme.metrics.spacing.md,
    alignItems: 'center',
  },
});
