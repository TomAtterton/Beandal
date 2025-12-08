import React from 'react';
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';

type Props = Omit<PressableProps, 'style'> & {
  style?: StyleProp<ViewStyle>;
  haptics?: boolean;
  hapticStyle?: Haptics.ImpactFeedbackStyle;
};

export const BaseButton = ({
  children,
  style,
  disabled,
  haptics = true,
  hapticStyle = Haptics.ImpactFeedbackStyle.Light,
  onPress,
  ...rest
}: Props) => {
  const handlePress: PressableProps['onPress'] = (event) => {
    if (haptics && !disabled) {
      Haptics.impactAsync(hapticStyle).catch(() => undefined);
    }

    onPress?.(event);
  };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) =>
        [
          styles.base,
          pressed && styles.pressed,
          disabled && styles.disabled,
          style,
        ] as StyleProp<ViewStyle>
      }
      onPress={handlePress}
      {...rest}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.6,
  },
});
