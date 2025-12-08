import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AppImage } from '@/components/AppImage';
import { theme } from '@theme';

type Props = {
  disableNavigation?: boolean;
};

const Splashscreen = ({ disableNavigation: _disableNavigation = false }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <AppImage source={theme.images.splashIcon} style={styles.image} />
      </View>

      <ActivityIndicator color={theme.colors.accent} size="large" style={styles.spinner} />
    </View>
  );
};

export default Splashscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingVertical: theme.metrics.spacing.xxl,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    // Keep in sync with app.json expo-splash-screen imageWidth to avoid visual jump.
    width: 260,
    height: 260,
  },
  spinner: {
    marginBottom: theme.metrics.spacing.lg,
  },
});
