import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { TranslatedText } from '@/components/TranslatedText';
import { IconButton } from '@/components/buttons';
import { theme } from '@theme';

type NumericStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  labelTranslation?: React.ComponentProps<typeof TranslatedText>['translation'];
  children?: React.ReactNode;
};

export const NumericStepper = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  labelTranslation,
  children,
}: NumericStepperProps) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = 1.06;
    scale.value = withTiming(1, { duration: 120 });
  }, [scale, value]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const adjust = (direction: 1 | -1) => {
    const next = value + direction * step;
    if (min !== undefined && next < min) return;
    if (max !== undefined && next > max) return;
    onChange(Number(next.toFixed(2)));
  };

  const decrementDisabled = min !== undefined && value <= min;
  const incrementDisabled = max !== undefined && value >= max;

  return (
    <View style={styles.field}>
      {labelTranslation || children ? (
        <TranslatedText translation={labelTranslation} variant="h4" style={styles.label}>
          {children}
        </TranslatedText>
      ) : null}
      <View style={styles.container}>
        <IconButton
          iconName="remove"
          onPress={() => adjust(-1)}
          style={styles.control}
          disabled={decrementDisabled}
          accessibilityLabel="Decrease value"
        />

        <Animated.View style={[animatedStyle]}>
          <TranslatedText style={styles.value}>{value}</TranslatedText>
        </Animated.View>

        <IconButton
          iconName="add"
          onPress={() => adjust(1)}
          style={styles.control}
          disabled={incrementDisabled}
          accessibilityLabel="Increase value"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    marginBottom: theme.metrics.spacing.md,
  },
  label: {
    marginBottom: theme.metrics.spacing.xs,
    fontStyle: 'italic',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.colors.subtleBorder,
    borderRadius: theme.metrics.radius.pill,
    paddingHorizontal: theme.metrics.spacing.sm,
    paddingVertical: theme.metrics.spacing.xs,
    backgroundColor: theme.colors.surface,
  },
  control: {
    paddingHorizontal: theme.metrics.spacing.sm,
    paddingVertical: theme.metrics.spacing.xs,
  },
  value: {
    fontSize: theme.typography.size.lg,
    color: theme.colors.textPrimary,
  },
});
