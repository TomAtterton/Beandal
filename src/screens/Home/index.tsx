import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { EmptyState } from '@/screens/Home/components/EmptyState';
import { theme } from '@theme';
import { FAB } from '@/components/buttons/FAB';

export default function Home() {
  const handleAdd = () => {
    // TODO: navigate to create flow
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <EmptyState />
      </View>

      <FAB accessibilityLabel="Add new item" onPress={handleAdd} style={styles.fab} />

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.metrics.spacing.xl,
    paddingVertical: theme.metrics.spacing.xl,
  },
  title: {
    color: theme.colors.textPrimary,
  },
  subtitle: {
    color: theme.colors.textMuted,
    marginTop: theme.metrics.spacing.xs,
  },
  header: {
    gap: theme.metrics.spacing.xs,
    marginBottom: theme.metrics.spacing.xl,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: theme.metrics.spacing.xl,
    right: theme.metrics.spacing.xl,
  },
});
