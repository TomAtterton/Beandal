import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppImage } from '@/components/AppImage';
import { TranslatedText } from '@/components/TranslatedText';
import { theme } from '@theme';

const emptyImage = require('../../../../assets/images/empty_state.png');

export const EmptyState = () => {
  return (
    <View style={styles.container}>
      <AppImage source={emptyImage} style={styles.image} />
      <TranslatedText translation="home.emptyTitle" variant="h2" style={styles.title} />
      <TranslatedText translation="home.emptyBody" style={styles.body} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: theme.metrics.spacing.md,
  },
  image: {
    width: 240,
    height: 240,
  },
  title: {
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  body: {
    color: theme.colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: theme.metrics.spacing.xl,
  },
});
