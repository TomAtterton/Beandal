import React, { useEffect } from 'react';
import { DimensionValue, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { theme, palette } from '@theme';

type Props = {
  height: number;
  width?: DimensionValue;
  radius?: number;
  style?: StyleProp<ViewStyle>;
};

export const ShimmerBlock = ({
  height,
  width = '100%',
  radius = theme.metrics.radius.sm,
  style,
}: Props) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [palette.divider.light, palette.divider.medium],
    ),
  }));

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: theme.colors.surface,
        },
        animatedStyle,
        style,
      ]}
    />
  );
};
