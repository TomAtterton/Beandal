import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppImage } from '@/components/AppImage';
import { Icon } from '@/components/Icon';
import { TranslatedText } from '@/components/TranslatedText';
import { BaseButton } from '@/components/buttons/BaseButton';
import { theme } from '@theme';
import { Bean, Recipe } from '@/validation/coffeeSchemas';
import { RecipeBeanMetricPill } from './RecipeBeanMetricPill';

type Props = {
  bean: Bean;
  recipe?: Recipe;
  onPress?: (beanId: string, recipeId?: string) => void;
};

export const RecipeBeanListItem = ({ bean, recipe, onPress }: Props) => {
  const handlePress = () => onPress?.(bean.id, recipe?.id);

  const metricPills = useMemo(() => {
    if (!recipe) return null;
    return (
      <>
        <RecipeBeanMetricPill
          icon="settings-outline"
          label="Grind"
          value={`${recipe.grindSetting}`}
        />
        <RecipeBeanMetricPill icon="golf-outline" label="Dose" value={`${recipe.dose} g`} />
        <RecipeBeanMetricPill icon="water-outline" label="Yield" value={`${recipe.yield} g`} />
        <RecipeBeanMetricPill
          icon="thermometer-outline"
          label="Temp"
          value={`${recipe.temperature}°C`}
        />
      </>
    );
  }, [recipe]);

  return (
    <BaseButton style={styles.touchable} onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          {bean.imageUri ? (
            <AppImage source={{ uri: bean.imageUri }} style={styles.image} contentFit="cover" />
          ) : (
            <View style={styles.placeholder}>
              <Icon name="cafe-outline" color={theme.colors.textSecondary} size={22} />
            </View>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <TranslatedText variant="h3" numberOfLines={1} style={styles.title}>
              {bean.name}
            </TranslatedText>
            {bean.roaster ? (
              <TranslatedText variant="caption" numberOfLines={1} style={styles.roaster}>
                {bean.roaster}
              </TranslatedText>
            ) : null}
          </View>

          {bean.roastDate ? (
            <TranslatedText variant="caption" style={styles.meta}>
              {`Roast date: ${bean.roastDate}`}
            </TranslatedText>
          ) : null}

          {bean.notes ? (
            <TranslatedText style={styles.notes} numberOfLines={2}>
              {bean.notes}
            </TranslatedText>
          ) : null}

          <View style={styles.metricsRow}>
            {metricPills ?? (
              <TranslatedText
                variant="caption"
                style={styles.noRecipe}
                translation="home.noRecipe"
              />
            )}
          </View>
        </View>
      </View>
    </BaseButton>
  );
};

const IMAGE_SIZE = 72;

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
    borderRadius: theme.metrics.radius.lg,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    gap: theme.metrics.spacing.md,
    padding: theme.metrics.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.metrics.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.subtleBorder,
  },
  imageWrapper: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: theme.metrics.radius.md,
    overflow: 'hidden',
    backgroundColor: theme.colors.backgroundAlt,
    borderWidth: 1,
    borderColor: theme.colors.subtleBorder,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: theme.metrics.radius.md,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    gap: theme.metrics.spacing.xs,
  },
  header: {
    gap: theme.metrics.spacing.xs / 2,
  },
  title: {
    color: theme.colors.textPrimary,
  },
  roaster: {
    color: theme.colors.textSecondary,
  },
  meta: {
    color: theme.colors.textMuted,
  },
  notes: {
    color: theme.colors.textPrimary,
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.metrics.spacing.xs,
    alignItems: 'center',
  },
  noRecipe: {
    color: theme.colors.textMuted,
  },
});
