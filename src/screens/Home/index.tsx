import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { theme } from '@theme';
import { TranslatedText } from '@/components/TranslatedText';

export default function Home() {
  return (
    <View style={styles.container}>
      <TranslatedText translation="home.title" variant="h1" style={styles.title} />
      <TranslatedText
        translation={{ key: 'home.welcome', values: { name: 'Tom' } }}
        style={styles.helper}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.metrics.spacing.xl,
  },
  title: {
    marginBottom: theme.metrics.spacing.sm,
  },
  subtitle: {
    color: theme.colors.textSecondary,
  },
  helper: {
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: theme.metrics.spacing.sm,
  },
});
