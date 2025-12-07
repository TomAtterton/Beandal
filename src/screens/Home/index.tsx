import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@theme';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BeanDal</Text>
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
    color: theme.colors.textPrimary,
    ...theme.typography.variants.h1,
    marginBottom: theme.metrics.spacing.sm,
  },
});
