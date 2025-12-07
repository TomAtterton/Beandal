import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppImage } from '@/components/AppImage';
import { TranslatedText } from '@/components/TranslatedText';
import { theme } from '@theme';

type Props = {
  message: string;
};

export const RecipeBeanListErrorState = ({ message }: Props) => (
  <View style={styles.stateContainer}>
    <AppImage source={theme.images.emptyState} style={styles.stateImage} />
    <TranslatedText variant="h3" style={styles.errorTitle} translation="home.errorTitle" />
    <TranslatedText style={styles.errorLabel}>{message}</TranslatedText>
  </View>
);

const styles = StyleSheet.create({
  stateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.metrics.spacing.md,
  },
  stateImage: {
    width: 200,
    height: 200,
  },
  errorTitle: {
    textAlign: 'center',
  },
  errorLabel: {
    color: theme.colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: theme.metrics.spacing.lg,
  },
});
